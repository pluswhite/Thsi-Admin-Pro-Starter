import React from 'react'
import { browserHistory, Router } from 'react-router'
import { Provider } from 'react-redux'
import { IntlProvider, addLocaleData } from 'react-intl'
import { LocaleProvider } from 'antd'
import PropTypes from 'prop-types'

// import i18n configs.
// Antd locales
import andtEnUS from 'antd/lib/locale-provider/en_US'
import antZhCN from 'antd/lib/locale-provider/zh_CN'
// React Intl locales
import englishLocaleData from 'react-intl/locale-data/en'
import chineseLocaleData from 'react-intl/locale-data/zh'

// Our locales
import vraEn from 'vi18n/en'
import vraZhCN from 'vi18n/zh'

addLocaleData([
  // English.
  ...englishLocaleData,
  ...vraEn,
  // Chinese.
  ...chineseLocaleData,
  ...vraZhCN
])

const chooseLocale = (locale) => {
  locale = locale.toLowerCase()
  let configs = {}
  switch (locale) {
    case 'en-us':
      configs = {
        'locale': 'en',
        'antd': andtEnUS,
        'vra': vraEn
      }
      break
    case 'zh-cn':
      configs = {
        'locale': 'zh',
        'antd': antZhCN,
        'vra': vraZhCN
      }
      break
    default:
      configs = {
        'locale': 'en',
        'antd': andtEnUS,
        'vra': vraEn
      }
      break
  }

  return configs
}

class App extends React.Component {
  static propTypes = {
    store: PropTypes.object.isRequired,
    routes: PropTypes.object.isRequired,
    locale: PropTypes.string
  }

  // shouldComponentUpdate () {
  //   return false
  // }

  render () {
    const { store, routes, locale } = this.props
    const localeName = locale || navigator.language
    const localeConfig = chooseLocale(localeName)
    // console.log(localeConfig)
    // console.log(locale)

    return (
      <LocaleProvider locale={localeConfig.antd}>
        <IntlProvider locale={localeConfig.locale} messages={localeConfig.vra}>
          <Provider store={store}>
            <div style={{ height: '100%' }}>
              <Router history={browserHistory} children={routes} />
            </div>
          </Provider>
        </IntlProvider>
      </LocaleProvider>
    )
  }
}

export default App
