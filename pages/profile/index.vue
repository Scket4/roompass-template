<template>
  <div class="container-profile">
    <template v-if="subscription.coins">
      <div class="coins">
        <img ref="coin" src="../../assets/coin.png" class="coin" alt="coin">
        <p class="coins__count">
          {{ subscription.coins }}
        </p>
      </div>
      <div class="date">
        <p class="date__text--hint">
          Действует до
        </p>
        <p class="date__text">
          {{ new Date(subscription.date_end).toLocaleDateString('ru-RU') }}
        </p>
      </div>
    </template>
    <div v-else class="empty">
      <p class="date__text">
        У вас нет активного абонемента :(
      </p>
      <p class="date__text--hint">
        Чтобы приобрести абонемент - нажмите на кнопку "Прочие действия" - "Оформить абонемент"
        Либо обратитесь к&nbsp;
        <a href="https://t.me/platforma_coworking_admin">администратору</a>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    subscription: {}
  }),
  async mounted () {
    const params = this.$route.query
    this.subscription = await this.$http.$get(`/api/users/${params.user}/${params.type}`)

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
$linkColor: var(--tg-theme-link-color);

.container-profile {
  max-width: 800%;
  min-height: 100vh;
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

.empty {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin-top: 25px;
  align-items: flex-start;
  padding: 0 25px;

  p {
    text-align: left;
  }

  &>p {
    margin-bottom: 25px;
  }
}

a {
  color: $linkColor;
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
