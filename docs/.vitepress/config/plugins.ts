import type { MarkdownRenderer } from 'vitepress'
import fs from 'fs'
import path from 'path'
import mdContainer from 'markdown-it-container'

export const mdPlugin = (md: MarkdownRenderer) => {
  md.use(mdContainer, 'demo', {
    validate(params) {
      return !!params.trim().match(/^demo\s*(.*)$/)
    },
    render(tokens, idx) {
      const m = tokens[idx].info.trim().match(/^demo\s+(.*)$/)

      if (tokens[idx].nesting === 1) {
        const description = m ? m[1] : ''
        const sourceFileToken = tokens[idx + 2]
        let source = ''
        const sourceFile = sourceFileToken.children?.[0].content ?? ''

        if (sourceFileToken.type === 'inline') {
          source = fs.readFileSync(
            path.resolve('docs/examples', `${sourceFile}.vue`),
            'utf-8',
          )
          sourceFileToken.children[0].content = ''
        }

        if (!source) throw new Error(`Incorrect source file: ${sourceFile}`)

        return description === 'onlyShow'
          ? `<ClientOnly><ep-${sourceFile.replaceAll('/', '-')}/></ClientOnly>`
          : `<ClientOnly>
              <Demo source="${encodeURIComponent(md.render(`\`\`\` vue\n${source}\`\`\``))}"
                path="${sourceFile}"
                raw-source="${encodeURIComponent(source)}"
                description="${encodeURIComponent(md.render(description))}">
                <template #source>
                  <ep-${sourceFile.replaceAll('/', '-')}/>
                </template>
              </Demo>
            </ClientOnly>`
      } else {
        return '\n'
      }
    },
  })
}
