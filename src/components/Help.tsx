import React from 'react'

const Help = () => {
  return (
    <div className='container' style={{ fontSize: 20, padding: 10 }}>
      <p style={{ marginBottom: 10 }}>
        В приложении вы можете посмотреть данные о текущей погоде в любом городе.
      </p>
      <p style={{ marginBottom: 10 }}>
        На вкладке «Детали» вы найдете подробную информацию о погоде в выбранном вами городе.
      </p>
      <p style={{ marginBottom: 10 }}>
        Вкладка «Прогноз» показывает прогноз погоды на 5 дней вперед.
      </p>
      <p style={{ marginBottom: 10 }}>Любой город можно добавлять в список "Избранных".</p>
      <p>Пункт меню "Статистика" покажет интересные данные по вашим запросам.</p>
    </div>
  )
}

export default Help
