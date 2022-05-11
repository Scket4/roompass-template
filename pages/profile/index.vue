<template>
  <div class="container-profile">
    <div class="coins">
      <img ref="coin" src="../../assets/coin.png" class="coin" alt="coin">
      <p class="coins__count">
        {{ coins }}
      </p>
    </div>
    <div class="date">
      <p class="date__text--hint">
        Действует до
      </p>
      <p class="date__text">
        {{ date_end }}
      </p>
    </div>

    {{ users }}
  </div>
</template>

<script>
export default {
  async asyncData ({ $http }) {
    const data = await $http.$get('/api/users')
    return { users: data }
  },
  data: () => ({
    about: ' js разработчик',
    coins: 540,
    date_end: '18.05.2022',
    tlgm: '',
    params: ''
  }),
  mounted () {
    window.Telegram.WebApp.MainButton.setText('Закрыть')
    window.Telegram.WebApp.MainButton.show()
    window.Telegram.WebApp.MainButton.onClick(() => {
      window.Telegram.WebApp.close()
    })
  }
}
</script>

<style lang="scss" scoped>

$textColor: var(--tg-theme-text-color);
$bgolor: var(--tg-theme-bg-color);
$hintColor: var(--tg-theme-hint-color);

.container-profile {
  max-width: 800%;
  height: 100%;
  background-color: $bgolor;
  color: $textColor;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding-top: 50px;

  .coins {
    display: flex;
    width: 100%;
    margin-bottom: 25px;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    & .coin {
      width: 70px;
      height: 70px;
      margin-bottom: 25px;
      animation: 2s rotate infinite 2s;
    }

    &__count {
      color: $textColor;
      font-size: 54px;
      font-weight: 600;
    }
  }

  .date {
    display: flex;
    width: 100%;
    align-items: center;
    flex-direction: column;

    &__text {
      color: $textColor;
      font-size: 24px;
      font-weight: 600;

      &--hint {
        color: $hintColor;
        font-size: 12px;
        text-transform: uppercase;
      }
    }
  }
}

@keyframes rotate {
  0% {
    transform: rotateY(0deg);
  }
  30% {
    transform: rotateY(180deg);
  }
  100% {
    transform: rotateY(180deg);
  }
}
</style>
