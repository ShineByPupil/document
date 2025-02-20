import type { Ref } from 'vue'
import { computed } from 'vue'
import { useData } from 'vitepress'
import { createGitHubUrl } from '../utils'

export const useSourceCode = (path: Ref<string>) => {
    const { theme } = useData()

    return computed(() => {
        const {
            repo,
            docsDir = '',
            docsBranch = 'dev',
            docsRepo = repo,
        } = theme.value

        return createGitHubUrl(docsRepo, docsDir, docsBranch, path.value)
    })
}
