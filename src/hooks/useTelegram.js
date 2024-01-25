export const telegramApp = window.Telegram.WebApp

export function useTelegram() {
  const checkrunAndExpand = () => {
    telegramApp.ready()
    telegramApp.expand()
  }

  const onClose = () => {
    telegramApp.close()
  }

  const onToggleButton = () => {
    if (telegramApp.MainButton.isVisible) {
      telegramApp.MainButton.hide()
    } else {
      telegramApp.MainButton.show()
    }
  }

  return {
    onClose,
    onToggleButton,
    checkrunAndExpand,
    user: telegramApp?.initData,
    userUnsafe: telegramApp?.initDataUnsafe,
    queryId: telegramApp.initDataUnsafe?.query_id,
  }
}
