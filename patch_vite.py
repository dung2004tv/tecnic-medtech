import os

filepath = 'vite.config.ts'
with open(filepath, 'r') as f:
    content = f.read()

replacement = """    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {
        ignored: ['**/*.json', '**/node_modules/**']
      },
    },"""

content = content.replace("""    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâ€”file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },""", replacement)
    
# Check for alternate encoding/char issue in original file
content = content.replace("Do not modifyâ€”file", "Do not modify—file")

with open(filepath, 'w') as f:
    f.write(content)

