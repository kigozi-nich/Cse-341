#!/usr/bin/env node

const { spawn } = require('child_process');
const port = process.argv[2] || '3000';

console.log(`🔍 Checking what's using port ${port}...\n`);

// Check what's using the port
const isWindows = process.platform === 'win32';
const cmd = isWindows ? 'netstat' : 'lsof';
const args = isWindows ? ['-ano'] : ['-i', `:${port}`];

const proc = spawn(cmd, args);

let output = '';
proc.stdout.on('data', (data) => {
  output += data.toString();
});

proc.stderr.on('data', (data) => {
  console.error('Error:', data.toString());
});

proc.on('close', (code) => {
  if (isWindows) {
    const lines = output.split('\n').filter(line => line.includes(`:${port}`));
    if (lines.length === 0) {
      console.log(`✅ Port ${port} appears to be available`);
    } else {
      console.log(`❌ Port ${port} is in use:`);
      lines.forEach(line => {
        const parts = line.trim().split(/\s+/);
        if (parts.length >= 5) {
          const pid = parts[parts.length - 1];
          console.log(`   PID: ${pid} - ${line.trim()}`);
          console.log(`   To kill: taskkill /PID ${pid} /F`);
        }
      });
    }
  } else {
    if (output.trim()) {
      console.log(`❌ Port ${port} is in use:`);
      console.log(output);
      const pids = output.match(/\s+(\d+)\s+/g);
      if (pids) {
        pids.forEach(pidMatch => {
          const pid = pidMatch.trim();
          console.log(`   To kill: kill -9 ${pid}`);
        });
      }
    } else {
      console.log(`✅ Port ${port} appears to be available`);
    }
  }
});