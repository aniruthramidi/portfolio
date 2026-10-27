import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { LogOut, Trash2, Plus, MessageSquare, Briefcase } from 'lucide-react';
import './AdminPanel.css';

export const AdminPanel = () => {
  const [password, setPassword] = useState('');
  const [token, setToken] = useState(() => localStorage.getItem('portfolio-admin-token') || '');
  const [loginError, setLoginError] = useState('');
  const [submittingLogin, setSubmittingLogin] = useState(false);

  // Panel navigation
  const [activeSubTab, setActiveSubTab] = useState('projects');

  // Lists
  const [projectsList, setProjectsList] = useState([]);
  const [messagesList, setMessagesList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [actionMessage, setActionMessage] = useState({ type: '', text: '' });

  // Add Project Form
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newTech, setNewTech] = useState('');
  const [newGithub, setNewGithub] = useState('');
  const [newLive, setNewLive] = useState('');
  const [newFeatured, setNewFeatured] = useState(false);
  const [newMockupType, setNewMockupType] = useState('grid');
  const [addingProject, setAddingProject] = useState(false);

  const BASE_URL = 'https://server-seven-delta-28.vercel.app/api';

  useEffect(() => {
    if (token) {
      localStorage.setItem('portfolio-admin-token', token);
      loadAdminData();
    } else {
      localStorage.removeItem('portfolio-admin-token');
    }
  }, [token, activeSubTab]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError('');
    setSubmittingLogin(true);

    try {
      const response = await fetch(`${BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();

      if (response.ok) {
        setToken(data.token);
      } else {
        setLoginError(data.error || 'Incorrect password.');
      }
    } catch (err) {
      setLoginError('Could not connect to backend server.');
    } finally {
      setSubmittingLogin(false);
    }
  };

  const loadAdminData = async () => {
    if (!token) return;
    setLoading(true);
    setActionMessage({ type: '', text: '' });

    try {
      const endpoint = activeSubTab === 'projects' ? '/projects' : '/messages';
      const headers = { 'Authorization': `Bearer ${token}` };

      const response = await fetch(`${BASE_URL}${endpoint}`, { headers });
      
      if (response.status === 401 || response.status === 400) {
        // Token expired/invalid, clear session
        setToken('');
        return;
      }

      const data = await response.json();
      if (response.ok) {
        if (activeSubTab === 'projects') {
          setProjectsList(data);
        } else {
          setMessagesList(data);
        }
      }
    } catch (err) {
      console.error('Error fetching admin data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    setToken('');
    localStorage.removeItem('portfolio-admin-token');
  };

  const handleAddProject = async (e) => {
    e.preventDefault();
    setAddingProject(true);
    setActionMessage({ type: '', text: '' });

    const techArray = newTech.split(',').map(t => t.trim()).filter(t => t.length > 0);

    const projectData = {
      title: newTitle,
      description: newDesc,
      tech: techArray,
      github: newGithub,
      live: newLive,
      featured: newFeatured,
      mockupType: newMockupType,
      accent: '#ffffff',
      gradient: 'linear-gradient(135deg, #000000 0%, #1a1a1a 100%)'
    };

    try {
      const response = await fetch(`${BASE_URL}/projects`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(projectData),
      });

      if (response.ok) {
        setActionMessage({ type: 'success', text: `Project "${newTitle}" added successfully!` });
        setNewTitle('');
        setNewDesc('');
        setNewTech('');
        setNewGithub('');
        setNewLive('');
        setNewFeatured(false);
        setNewMockupType('grid');
        loadAdminData();
      } else {
        const data = await response.json();
        setActionMessage({ type: 'error', text: data.error || 'Failed to add project.' });
      }
    } catch (err) {
      setActionMessage({ type: 'error', text: 'Server connection error.' });
    } finally {
      setAddingProject(false);
    }
  };

  const handleDeleteProject = async (projectId, projectTitle) => {
    if (!window.confirm(`Are you sure you want to delete project "${projectTitle}"?`)) return;

    try {
      const response = await fetch(`${BASE_URL}/projects/${projectId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` },
      });

      if (response.ok) {
        setActionMessage({ type: 'success', text: `Project "${projectTitle}" deleted successfully!` });
        loadAdminData();
      }
    } catch (err) {
      setActionMessage({ type: 'error', text: 'Server connection error.' });
    }
  };

  const handleDeleteMessage = async (messageId) => {
    if (!window.confirm('Are you sure you want to delete this message?')) return;

    try {
      const response = await fetch(`${BASE_URL}/messages/${messageId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` },
      });

      if (response.ok) {
        setActionMessage({ type: 'success', text: 'Contact message removed successfully.' });
        loadAdminData();
      }
    } catch (err) {
      setActionMessage({ type: 'error', text: 'Server connection error.' });
    }
  };

  // ── RENDER LOGIN SCREEN ──
  if (!token) {
    return (
      <div className="admin-login-wrapper">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="admin-login-card glass-panel"
        >
          <div className="login-header">
            <h2>Portfolio Admin Portal</h2>
            <p>Access your backend management workspace</p>
          </div>

          <form onSubmit={handleLogin} className="login-form">
            <div className="login-field">
              <label htmlFor="admin-pw">Access Code</label>
              <input
                type="password"
                id="admin-pw"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password..."
                required
              />
            </div>

            {loginError && <div className="login-error-alert">{loginError}</div>}

            <button type="submit" disabled={submittingLogin} className="login-submit-btn">
              {submittingLogin ? 'Authorizing...' : 'Log In'}
            </button>
          </form>
          
          <div className="login-back-btn">
            <a href="/">← Return to Portfolio</a>
          </div>
        </motion.div>
      </div>
    );
  }

  // ── RENDER DASHBOARD SCREEN ──
  return (
    <div className="admin-dashboard-wrapper">
      {/* Sidebar navigation */}
      <aside className="admin-sidebar">
        <div className="admin-sidebar-logo">
          <h2>Portfolio Admin</h2>
        </div>

        <nav className="admin-sidebar-menu">
          <button 
            onClick={() => setActiveSubTab('projects')} 
            className={`menu-item-btn ${activeSubTab === 'projects' ? 'active' : ''}`}
          >
            <Briefcase size={18} />
            <span>Manage Projects</span>
          </button>
          <button 
            onClick={() => setActiveSubTab('messages')} 
            className={`menu-item-btn ${activeSubTab === 'messages' ? 'active' : ''}`}
          >
            <MessageSquare size={18} />
            <span>Inbox Messages</span>
          </button>
        </nav>

        <div className="admin-sidebar-footer">
          <button onClick={handleLogout} className="admin-logout-btn">
            <LogOut size={16} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main content pane */}
      <main className="admin-content-pane">
        <header className="admin-pane-header">
          <div className="header-meta">
            <h1>{activeSubTab === 'projects' ? 'Project Management' : 'Visitor Messages'}</h1>
            <p>{activeSubTab === 'projects' ? 'Add, edit, or delete portfolio catalog items.' : 'Read and manage inquiries sent through the contact form.'}</p>
          </div>
          <div className="header-actions">
            <a href="/" className="back-link-tag">View Site</a>
          </div>
        </header>

        {actionMessage.text && (
          <div className={`action-alert-banner alert-${actionMessage.type}`}>
            {actionMessage.text}
          </div>
        )}

        {activeSubTab === 'projects' ? (
          <div className="admin-grid-layout">
            {/* List Table Card */}
            <div className="pane-card glass-panel projects-list-col">
              <div className="pane-card-header">
                <h3>Projects List</h3>
              </div>

              {loading ? (
                <div className="loading-data-text">Loading catalog...</div>
              ) : (
                <div className="admin-table-container">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Project Title</th>
                        <th>Technologies</th>
                        <th>Featured</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {projectsList.map((proj) => (
                        <tr key={proj._id}>
                          <td className="strong-td">{proj.title}</td>
                          <td>
                            <div className="td-tags">
                              {proj.tech.slice(0, 3).map((t, idx) => (
                                <span key={idx} className="td-badge">{t}</span>
                              ))}
                              {proj.tech.length > 3 && <span className="td-badge">+ {proj.tech.length - 3}</span>}
                            </div>
                          </td>
                          <td>
                            <span className={`feat-indicator ${proj.featured ? 'is-feat' : ''}`}>
                              {proj.featured ? 'Yes' : 'No'}
                            </span>
                          </td>
                          <td>
                            <button
                              onClick={() => handleDeleteProject(proj._id, proj.title)}
                              className="admin-action-btn delete-btn"
                              title="Delete Project"
                            >
                              <Trash2 size={16} />
                            </button>
                          </td>
                        </tr>
                      ))}
                      {projectsList.length === 0 && (
                        <tr>
                          <td colSpan="4" className="empty-td">No projects cataloged yet. Seed initial data or add one.</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* Create Project Form Card */}
            <div className="pane-card glass-panel add-project-col">
              <div className="pane-card-header">
                <h3>Create Project</h3>
              </div>

              <form onSubmit={handleAddProject} className="add-project-form">
                <div className="form-group-field">
                  <label>Project Title</label>
                  <input
                    type="text"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="e.g. Decibel"
                    required
                  />
                </div>

                <div className="form-group-field">
                  <label>Description</label>
                  <textarea
                    value={newDesc}
                    onChange={(e) => setNewDesc(e.target.value)}
                    placeholder="Provide description..."
                    rows={4}
                    required
                  />
                </div>

                <div className="form-group-field">
                  <label>Technologies (Comma separated)</label>
                  <input
                    type="text"
                    value={newTech}
                    onChange={(e) => setNewTech(e.target.value)}
                    placeholder="e.g. React.js, Node.js, Express.js"
                    required
                  />
                </div>

                <div className="form-group-field">
                  <label>GitHub Repository URL</label>
                  <input
                    type="url"
                    value={newGithub}
                    onChange={(e) => setNewGithub(e.target.value)}
                    placeholder="e.g. https://github.com/..."
                  />
                </div>

                <div className="form-group-field">
                  <label>Live Website URL</label>
                  <input
                    type="url"
                    value={newLive}
                    onChange={(e) => setNewLive(e.target.value)}
                    placeholder="e.g. https://..."
                  />
                </div>

                <div className="form-grid-2col">
                  <div className="form-group-field">
                    <label>Mockup Display Type</label>
                    <select value={newMockupType} onChange={(e) => setNewMockupType(e.target.value)}>
                      <option value="grid">Grid (Default)</option>
                      <option value="dashboard">Dashboard View</option>
                      <option value="phone">Phone / Mobile</option>
                      <option value="sidebar">Sidebar Layout</option>
                    </select>
                  </div>

                  <div className="form-group-field checkbox-group">
                    <label>
                      <input
                        type="checkbox"
                        checked={newFeatured}
                        onChange={(e) => setNewFeatured(e.target.checked)}
                      />
                      <span>Featured Work</span>
                    </label>
                  </div>
                </div>

                <button type="submit" disabled={addingProject} className="submit-form-btn">
                  <Plus size={16} />
                  <span>{addingProject ? 'Creating...' : 'Add Project'}</span>
                </button>
              </form>
            </div>
          </div>
        ) : (
          /* Messages Inbox View */
          <div className="pane-card glass-panel full-width-card">
            <div className="pane-card-header">
              <h3>Inbox Messages ({messagesList.length})</h3>
            </div>

            {loading ? (
              <div className="loading-data-text">Loading inbox...</div>
            ) : (
              <div className="messages-stream-list">
                {messagesList.map((msg) => (
                  <div key={msg._id} className="message-item-card border-bottom">
                    <div className="message-item-header">
                      <div className="sender-meta">
                        <h4>{msg.name}</h4>
                        <span className="sender-email">{msg.email}</span>
                      </div>
                      <div className="message-actions">
                        <span className="message-date">{new Date(msg.createdAt).toLocaleDateString()}</span>
                        <button
                          onClick={() => handleDeleteMessage(msg._id)}
                          className="msg-delete-btn"
                          title="Delete message"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                    <div className="message-item-body">
                      <p>{msg.message}</p>
                    </div>
                  </div>
                ))}
                {messagesList.length === 0 && (
                  <div className="empty-stream-text">No visitor inquiries received.</div>
                )}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminPanel;
