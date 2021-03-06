import ElAlert from '../packages/alert'
import ElRow from '../packages/row'
import ElCol from '../packages/col'
import { ElButton } from './components/Button'
import ElScrollbar from '../packages/scrollbar'
import ElBacktop from '../packages/backtop'
import { version } from '../package.json'

const components = [ElAlert, ElRow, ElCol, ElScrollbar, ElBacktop, ElButton]

const install = (app, opts = {}) => {
  //   app.use(setupGlobalOptions(opts))
  components.forEach(component => {
    app.use(component)
  })
}

const element3 = {
  version,
  install
}

export { version, ElAlert, ElRow, ElCol, ElScrollbar, ElBacktop, ElButton }
export default element3
