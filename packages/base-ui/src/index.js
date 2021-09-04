import ElAlert from '../packages/alert'
import ElRow from '../packages/row'
import ElScrollbar from '../packages/scrollbar'
import ElBacktop from '../packages/backtop'
import { version } from '../package.json'

const components = [ElAlert, ElRow, ElScrollbar, ElBacktop]

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

export { version, ElAlert, ElRow, ElScrollbar,ElBacktop }
export default element3
