import { MockIo, Utils } from '@rpgjs/common'
import { entryPoint as entryPointServer, RpgServerEngine } from '@rpgjs/server'
import { entryPoint as entryPointClient, RpgClientEngine } from '@rpgjs/client'

const { ClientIo, serverIo } = MockIo

export function entryPoint(modules: any[], options: any = {}) {
    const io = new ClientIo()

    class Module {}

    class StandaloneGame {
        server: RpgServerEngine
        client: RpgClientEngine

        async start() {
            this.server = await entryPointServer(modules, {
                io: serverIo,
                standalone: true,
                basePath: '',
                globalConfig: options.globalConfigServer,
                ...options
            })
            this.client = entryPointClient(modules, { 
                standalone: true,
                io,
                globalConfig: options.globalConfigClient,
                ...options
            })
            await this.server.start()
            await this.client.start()
            return this
        }

        private setHooks(hooks, side: string) {
            if (!Utils.isArray(hooks)) modules.push({
                [side]: hooks
            })
            else modules.concat(hooks.map(hook => {
                return {
                    [side]: hook
                }
            }))  
        }

        logicHooks(serverHooks) {
            this.setHooks(serverHooks, 'server')
        }

        renderHooks(clientHooks) {
            this.setHooks(clientHooks, 'client')
        }
    }
   return new StandaloneGame()
}