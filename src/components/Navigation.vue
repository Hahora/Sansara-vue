<template>
  <nav
    class="bg-white border-t border-gray-200 px-2 py-1 sticky bottom-0 z-50 shadow-lg"
  >
    <div class="max-w-md mx-auto flex justify-around items-center">
      <router-link to="/" class="nav-item group" active-class="nav-item-active">
        <div
          class="relative flex flex-col items-center justify-center py-2 px-6 rounded-xl transition-all duration-200"
        >
          <div class="icon-wrapper">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="nav-icon"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
          </div>
          <span class="nav-label">Главная</span>
        </div>
      </router-link>

      <router-link
        to="/events"
        class="nav-item group"
        active-class="nav-item-active"
      >
        <div
          class="relative flex flex-col items-center justify-center py-2 px-6 rounded-xl transition-all duration-200"
        >
          <div class="icon-wrapper">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="nav-icon"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
          <span class="nav-label">События</span>
        </div>
      </router-link>

      <router-link
        to="/profile"
        class="nav-item group"
        active-class="nav-item-active"
      >
        <div
          class="relative flex flex-col items-center justify-center py-2 px-6 rounded-xl transition-all duration-200"
        >
          <div class="icon-wrapper">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="nav-icon"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </div>
          <span class="nav-label">Профиль</span>
        </div>
      </router-link>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Navigation",
};
</script>

<style scoped>
.nav-item {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #6b7280;
  transition: all 0.2s ease;
  flex: 1;
  max-width: 120px;
}

.nav-item:active {
  transform: scale(0.95);
}

.icon-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 4px;
}

.nav-icon {
  width: 26px;
  height: 26px;
  transition: all 0.2s ease;
}

.nav-label {
  font-size: 0.75rem;
  font-weight: 500;
  transition: all 0.2s ease;
  white-space: nowrap;
}

/* Эффект при наведении */
.nav-item:hover .icon-wrapper::before {
  content: "";
  position: absolute;
  width: 44px;
  height: 44px;
  background: #f3f4f6;
  border-radius: 14px;
  z-index: -1;
  transform: scale(1);
  transition: transform 0.2s ease;
}

.nav-item:hover .nav-icon {
  color: #4e5d51;
  transform: translateY(-2px);
}

.nav-item:hover .nav-label {
  color: #4e5d51;
}

/* Активное состояние */
.nav-item-active {
  color: #4e5d51;
}

.nav-item-active .icon-wrapper::before {
  content: "";
  position: absolute;
  width: 44px;
  height: 44px;
  background: linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%);
  border-radius: 14px;
  z-index: -1;
}

.nav-item-active .nav-icon {
  color: #4e5d51;
  stroke-width: 2.5;
}

.nav-item-active .nav-label {
  color: #4e5d51;
  font-weight: 600;
}

/* Индикатор активной страницы */
.nav-item-active::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 4px;
  height: 4px;
  background: #4e5d51;
  border-radius: 50%;
}

/* Адаптация для маленьких экранов */
@media (max-width: 360px) {
  .nav-icon {
    width: 24px;
    height: 24px;
  }

  .nav-label {
    font-size: 0.7rem;
  }

  .nav-item {
    max-width: 100px;
  }
}
</style>
