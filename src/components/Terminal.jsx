import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Terminal as TerminalIcon, CornerDownLeft, RefreshCw } from 'lucide-react';
import { soundFx } from '../utils/audio';
import './Terminal.css';

const COMMANDS = {
  help: 'Available commands:\n • help     - List all terminal commands\n • bio      - Quick bio summary\n • skills   - Overview of technical skills\n • projects - List featured projects\n • exp      - Show recent experience\n • contact  - Display email & social links\n • theme    - Toggle theme (dark/light)\n • clear    - Clear terminal output',
  bio: 'Aniruth Reddy — Full-Stack Developer & Intern at 3Skill.\nPassionate about building fast, accessible React/Node.js web apps and Web Audio tools.',
  skills: 'Tech Stack:\n • Frontend: React, JavaScript, Framer Motion, HTML5, CSS3, Web Audio API\n • Backend: Node.js, Express.js, REST APIs\n • Database: MongoDB, MySQL\n • Languages: C++, Java, JavaScript, Python\n • Tooling: Git, Vite, VS Code',
  projects: 'Projects:\n 1. Decibel - Real-time audio streaming & Web Audio visualizer\n 2. Trading Bot - Binance Futures trading CLI & signal analyzer\n 3. Neon Breakout - HTML5 Canvas arcade game\n 4. Calculator - CSS Grid & vanilla JS state experiment',
  exp: 'Experience:\n • Full Stack Development Intern @ 3Skill (Jun 2026 – Present)\n • Operations & Community Lead @ Strikers Esports (Extracurricular)',
  contact: 'Contact Info:\n • Email: aniruth.ramidi@gmail.com\n • GitHub: github.com/aniruthramidi\n • Location: Telangana, India',
};

const Terminal = ({ onToggleTheme }) => {
  const [history, setHistory] = useState([
    { text: 'Welcome to Aniruth CLI [v2.4.0]. Type "help" or click a command below to get started.', type: 'sys' },
  ]);
  const [input, setInput] = useState('');
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommand = (cmdStr) => {
    soundFx.playClick();
    const cleanCmd = cmdStr.trim().toLowerCase();

    if (!cleanCmd) return;

    const newHistory = [...history, { text: `$ ${cmdStr}`, type: 'input' }];

    if (cleanCmd === 'clear') {
      setHistory([]);
      setInput('');
      return;
    }

    if (cleanCmd === 'theme') {
      if (onToggleTheme) onToggleTheme();
      newHistory.push({ text: 'Theme toggled successfully!', type: 'output' });
    } else if (COMMANDS[cleanCmd]) {
      newHistory.push({ text: COMMANDS[cleanCmd], type: 'output' });
    } else {
      newHistory.push({
        text: `Command not found: "${cleanCmd}". Type "help" for a list of available commands.`,
        type: 'error',
      });
    }

    setHistory(newHistory);
    setInput('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleCommand(input);
  };

  return (
    <section className="section terminal-section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="s-header"
        >
          <span className="section-tag">Interactive CLI</span>
          <h2 className="section-title">
            Developer <span className="gradient-text">Console</span>
          </h2>
        </motion.div>

        <motion.div
          className="terminal-window glass-panel"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="terminal-bar">
            <div className="terminal-dots">
              <span className="dot red" />
              <span className="dot yellow" />
              <span className="dot green" />
            </div>
            <div className="terminal-title">
              <TerminalIcon size={14} /> bash — aniruth@portfolio ~ zsh
            </div>
            <button
              className="terminal-action"
              onClick={() => handleCommand('clear')}
              title="Clear terminal"
              onMouseEnter={() => soundFx.playHover()}
            >
              <RefreshCw size={14} />
            </button>
          </div>

          <div className="terminal-chips">
            {['help', 'bio', 'skills', 'projects', 'exp', 'contact', 'theme', 'clear'].map((cmd) => (
              <button
                key={cmd}
                className="chip-btn"
                onClick={() => handleCommand(cmd)}
                onMouseEnter={() => soundFx.playHover()}
              >
                {cmd}
              </button>
            ))}
          </div>

          <div className="terminal-body">
            {history.map((item, index) => (
              <div key={index} className={`terminal-line line-${item.type}`}>
                <pre>{item.text}</pre>
              </div>
            ))}
            <form onSubmit={handleSubmit} className="terminal-input-form">
              <span className="terminal-prompt">aniruth@dev:~$</span>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a command (e.g. help)..."
                className="terminal-input"
                autoComplete="off"
                spellCheck="false"
              />
              <button type="submit" className="terminal-submit">
                <CornerDownLeft size={14} />
              </button>
            </form>
            <div ref={bottomRef} />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Terminal;
