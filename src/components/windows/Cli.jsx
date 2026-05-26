import React from 'react'
import MacWindow from './MacWindow'
import "./cli.scss"
import * as TerminalModule from 'react-console-emulator'

let Terminal = TerminalModule
while (Terminal && Terminal.default && typeof Terminal !== 'function') {
  Terminal = Terminal.default
}

const Cli = ({ windowName, setWindowsState }) => {
  const commands = {
    about: {
      description: 'Learn more about Manan Sahni.',
      fn: () => "Hi, I'm Manan Sahni! I'm a passionate full-stack developer who loves building beautiful, interactive, and robust web applications. I specialize in both frontend (React, modern CSS) and backend technologies (ASP.NET Core, Node.js, Rust)."
    },
    skills: {
      description: 'See my technical stack.',
      fn: () => [
        'Languages: C#, JavaScript, TypeScript, Python, Rust, SQL',
        'Frontend: React, Vue.js, HTML5, CSS3/SASS, Bootstrap, Tailwind CSS',
        'Backend: ASP.NET Core MVC, Node.js, Express, Django, Socket.io',
        'Database: SQL Server, PostgreSQL, MongoDB, Redis',
        'DevOps/Tools: Docker, Git/GitHub, Firebase'
      ].join('\n')
    },
    projects: {
      description: 'View my featured work.',
      fn: () => [
        '1. Scheds - A comprehensive course schedule generator built with ASP.NET Core MVC.',
        '2. FinTrack - A real-time personal finance dashboard using React, Chart.js, and MongoDB.',
        '3. SecureAuth - A robust authentication microservice in Django with OAuth2 & JWT.',
        '4. ChatStream - Low-latency real-time chat application using Vue.js and Socket.io.',
        '5. TerminalX - CLI developer tool written in Rust.'
      ].join('\n')
    },
    contact: {
      description: 'Get in touch with me.',
      fn: () => [
        'Email: manansahni@example.com',
        'GitHub: github.com/manansahni',
        'LinkedIn: linkedin.com/in/manansahni'
      ].join('\n')
    }
  }

  const welcomeMessage = [
    "Welcome to Manan Sahni's interactive terminal portfolio!",
    "----------------------------------------------------------",
    "Type 'help' to see the list of available commands.",
    "",
    "Try running these commands:",
    "  about     - Learn more about me",
    "  skills    - View my developer stack",
    "  projects  - See my featured web/CLI projects",
    "  contact   - Get in touch or view my social profiles",
    "  clear     - Clear the terminal console screen",
    ""
  ].join('\n')

  return (
    <MacWindow windowName={windowName} setWindowsState={setWindowsState}> 
      <div className="cli-window"> 
        <Terminal
          commands={commands} 
          welcomeMessage={welcomeMessage}
          promptLabel={'manansahni:~$'}
          promptLabelStyle={{ color: '#00ff00' }}
        />
      </div>
    </MacWindow>
  )
}

export default Cli