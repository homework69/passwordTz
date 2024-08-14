<template>
  <Transition name="modal">
    <div class="modal" @click="closeModal">
      <div class="modal-block" @click.stop>
        <h2 class="modal-block__title">
          {{ 'Добавить Сервис' }}
        </h2>
        <div class="modal-block__inputs">
          <label for="service">
            <span>Сервис</span>
            <input required v-model="service" id="service" type="text" />
          </label>
          <div class="modal-block__form">
            <div class="modal-block__flex">
              <label for="passlang" class="modal-block__quest"
                >Введите длину пароля</label
              >
              <input required v-model="passLang" @input="validateInput" type="text" id="passlang" />
            </div>
            <div class="modal-block__flex">
              <p class="modal-block__quest">Использовать буквы?</p>
              <div class="modal-block__check">
                <div class="modal-block__el">
                  <input
                    type="radio"
                    class="form-check-input"
                    id="letters-yes"
                    name="letters-stacked"
                    value="true"
                    v-model="letters"
                    :disabled="inpDisabled"
                  />
                  <label class="form-check-label" for="letters-yes">Да</label>
                </div>
                <div class="modal-block__el">
                  <input
                    type="radio"
                    class="form-check-input"
                    id="letters-no"
                    name="letters-stacked"
                    value="false"
                    v-model="letters"
                    :disabled="inpDisabled"
                  />
                  <label class="form-check-label" for="letters-no">Нет</label>
                </div>
              </div>
            </div>
            <div class="modal-block__flex">
              <p class="modal-block__quest">Использовать цифры?</p>
              <div class="modal-block__check">
                <div class="modal-block__el">
                  <input
                    type="radio"
                    class="form-check-input"
                    id="number-yes"
                    name="radio-number"
                    value="true"
                    required
                    v-model="number"
                    :disabled="inpDisabled"
                  />
                  <label class="form-check-label" for="number-yes">Да</label>
                </div>
                <div class="modal-block__el">
                  <input
                    type="radio"
                    class="form-check-input"
                    id="number-no"
                    name="radio-number"
                    value="false"
                    required
                    v-model="number"
                    :disabled="inpDisabled"
                  />
                  <label class="form-check-label" for="number-no">Нет</label>
                </div>
              </div>
            </div>
            <div class="modal-block__flex">
              <p class="modal-block__quest">Использовать символы?</p>
              <div class="modal-block__check">
                <div class="modal-block__el">
                  <input
                    type="radio"
                    class="form-check-input"
                    id="symb-yes"
                    name="radio-sym"
                    required
                    value="true"
                    v-model="symb"
                    :disabled="inpDisabled"
                  />
                  <label class="form-check-label" for="symb-yes">Да</label>
                </div>
                <div class="modal-block__el">
                  <input
                    type="radio"
                    class="form-check-input"
                    id="symb-no"
                    name="radio-sym"
                    required
                    value="false"
                    v-model="symb"
                    :disabled="inpDisabled"
                  />
                  <label class="form-check-label" for="symb-no">Нет</label>
                </div>
              </div>
            </div>
            <div class="modal-block__select">
              <label for="registr">Выберите регистр</label>
              <select id="registr" v-model="regs" :disabled="inpDisabled">
                <option
                  v-for="(reg, index) in registers"
                  :key="index"
                  :value="reg.value"
                >
                  {{ reg.label }}
                </option>
              </select>
            </div>
            <div class="modal-block__flex">
              <label class="modal-block__quest" for="user"
                >Свой набор символов</label
              >
              <input
                @input="userPassword"
                v-model="userSymb"
                id="user"
                type="text"
              />
            </div>
          </div>
          <h3>{{ generatePass }}</h3>
        </div>
        <div class="modal-block__btns">
          <button class="modal-block__btn del" @click="closeModal">
            Отмена
          </button>
          <button class="modal-block__btn edit" @click="generatePassword">
            Добавить
          </button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
const props = defineProps(['isModal']);
import { useService } from '@/store/serviceItem.js';
import VueCookies from 'vue-cookies';
const store = useService();
const services = ref(store.service);

const inpDisabled = ref(false);

const service = ref('');
const regs = ref('');
const letters = ref('');
const number = ref('');
const symb = ref('');
const passLang = ref('');
const userSymb = ref('');
const generatePass = ref('');

const registers = ref([
  {
    label: 'Верхний регистр',
    value: 'upper',
  },
  {
    label: 'Нижний регистр',
    value: 'lower',
  },
  {
    label: 'Случайный регистр',
    value: 'random',
  },
]);

const validateInput = () => {
  passLang.value = passLang.value.replace(/\D/g, '')
}

const closeModal = () => {
  generatePass.value = userSymb.value = passLang.value = service.value = '';
  regs.value = '';
  letters.value = symb.value = number.value = '';
  props.isModal(false);
};
const simulateServerRequest = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const random = Math.random();
      if (random >= 0.5) {
        resolve('Положительный ответ от сервера');
      } else {
        reject('Отрицательный ответ от сервера');
      }
    }, 1000); // Задержка в 1 секунду для имитации отправки данных
  });
};

const generatePassword = () => {
  let passwordChars = '';
  let password = '';
  if (letters.value == 'true') {
    let lowercase = 'abcdefghijklmnopqrstuvwxyz';
    let uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let randomCase = Math.random() < 0.5 ? lowercase : uppercase;
    if (regs.value === 'lower') {
      passwordChars += lowercase;
    } else if (regs.value === 'upper') {
      passwordChars += uppercase;
    } else {
      passwordChars += randomCase;
    }
  }
  if (number.value == 'true') {
    passwordChars += '0123456789';
  }
  if (symb.value == 'true') {
    passwordChars += '!@#$%^&*-_';
  }
  if (passwordChars == '' && userSymb.value == '') {
    generatePass.value = 'Выберите хотябы один вид символов и укажите сервис';
    return;
  }
  for (let i = 0; i < parseInt(passLang.value); i++) {
    password += passwordChars.charAt(
      Math.floor(Math.random() * passwordChars.length)
    );
  }
  
  
  
  simulateServerRequest()
    .then((response) => {
      if (service.value != '' && passLang.value != '' && inpDisabled.value) {
        let existingService = services.value.find((el) => el.title == service.value);
        if (existingService) {
          existingService.password.push(userPassword());
        } else {
          store.pushService({title: service.value,password: [userPassword()]});
        }
      } else {
        let existingService = services.value.find(
          (el) => el.title == service.value
        );
        if (existingService) {
          existingService.password.push(password);
        } else {
          store.pushService({ title: service.value, password: [password]});
        }
      }
      alert(response);
      closeModal()
    })
    .catch((error) => {
      alert(error);
    });

};

const userPassword = () => {
  inpDisabled.value = true;
  regs.value = letters.value = symb.value = number.value = '';
  let passwordChars = userSymb.value;
  let password = '';
  for (let i = 0; i < parseInt(passLang.value); i++) {
    password += passwordChars.charAt(
      Math.floor(Math.random() * passwordChars.length)
    );
  }
  return password;
};

onMounted(() => {
  let localService = localStorage.services;
  if (localService) {
    store.setService(JSON.parse(localService));
    services.value = store.service;
  }
});

watch(
  services,
  () => {
    localStorage.services = JSON.stringify(services.value);
    VueCookies.set('services', JSON.stringify(services), 10);
    sessionStorage.setItem('services', JSON.stringify(services));
  },
  { deep: true }
);
</script>

<style lang="scss" scoped>
.modal {
  background: rgba(0, 0, 0, 0.35);
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
  &-block {
    border-radius: 28px;
    background: linear-gradient(
        0deg,
        rgba(103, 80, 164, 0.11) 0%,
        rgba(103, 80, 164, 0.11) 100%
      ),
      #fffbfe;
    max-width: 350px;
    width: 100%;
    padding: 24px;
    &__quest {
      font-size: 20px;
      margin-bottom: 10px;
      display: block;
    }
    &__check {
      display: flex;
      gap: 10px;
      margin-left: 2px;
    }
    &__flex {
      margin-bottom: 16px;
    }
    &__select {
      display: flex;
      flex-direction: column;
      gap: 16px;
      margin-bottom: 16px;
    }
    &__title {
      color: #1c1b1f;
      font-size: 24px;
      line-height: 32px;
      margin-bottom: 16px;
    }
    &__inputs {
      display: flex;
      flex-direction: column;
      gap: 16px;
      max-height: 300px;
      overflow-y: auto;
      & label {
        position: relative;
        & span {
          position: absolute;
          top: 8px;
          left: 16px;
          color: #6750a4;
          font-size: 12px;
          line-height: 16px;
          letter-spacing: 0.4px;
        }
        & #service {
          width: 100%;
          height: 56px;
          border: none;
          outline: none;
          resize: none;
          border-radius: 4px 4px 0px 0px;
          background: #e7e0ec;
          padding: 23px 16px 9px 16px;
          border-bottom: 1px solid #1c1b1f;
        }
      }
    }
    &__btns {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      gap: 8px;
      margin-top: 24px;
    }
    &__btn {
      padding: 10px 12px;
      font-size: 14px;
      font-weight: 700;
      line-height: 20px;
      letter-spacing: 0.1px;
      text-transform: uppercase;
      &.del {
        color: red;
      }
      &.edit {
        color: #6750a4;
      }
    }
  }
}
.form-check-input {
  transform: scale(1.2);
  margin-right: 5px;
}
.modal-enter-active,
.modal-leave-active {
  transition: all 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
  transform: scale(1.3);
}
</style>
