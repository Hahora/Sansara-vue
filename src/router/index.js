import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/pages/HomePage.vue'
import ProfilePage from '@/pages/ProfilePage.vue'
import BachelorPage from '@/pages/BachelorPage.vue'
import ClubEventsPage from '@/pages/ClubEventsPage.vue'
import CollectiveProgramsPage from '@/pages/CollectiveProgramsPage.vue'
import AuthorProgramsPage from '@/pages/AuthorProgramsPage.vue'
import LoyaltyPage from '@/pages/LoyaltyPage.vue'
import FirstTimePage from '@/pages/FirstTimePage.vue'
import CorporatePage from '@/pages/CorporatePage.vue'
import CertificatesPage from '@/pages/CertificatesPage.vue'
import ProgramsPage from '@/pages/ProgramsPage.vue'
import EventsPage from '@/pages/EventsPage.vue'
import BookingPage from '@/pages/BookingPage.vue'
import AdminPage from '@/pages/AdminPage.vue'
import AdminBookingsPage from '@/pages/AdminBookingsPage.vue'
import ContentPage from '@/pages/ContentPage.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage
  },
  {
    path: '/profile',
    name: 'Profile',
    component: ProfilePage
  },
  {
    path: '/bachelor',
    name: 'Bachelor',
    component: BachelorPage
  },
  {
    path: '/club-events',
    name: 'ClubEvents',
    component: ClubEventsPage
  },
  {
    path: '/collective-programs',
    name: 'CollectivePrograms',
    component: CollectiveProgramsPage
  },
  {
    path: '/author-programs',
    name: 'AuthorPrograms',
    component: AuthorProgramsPage
  },
  {
    path: '/loyalty',
    name: 'Loyalty',
    component: LoyaltyPage
  },
  {
    path: '/first-time',
    name: 'FirstTime',
    component: FirstTimePage
  },
  {
    path: '/corporate',
    name: 'Corporate',
    component: CorporatePage
  },
  {
    path: '/certificates',
    name: 'Certificates',
    component: CertificatesPage
  },
  {
    path: '/programs',
    name: 'Programs',
    component: ProgramsPage
  },
  {
    path: '/events',
    name: 'Events',
    component: EventsPage
  },
  {
    path: '/booking',
    name: 'Booking',
    component: BookingPage
  },
  {
    path: '/booking/:programId?/:programType?/:eventId?',
    name: 'BookingWithParams',
    component: BookingPage,
    props: true
  },
  {
    path: '/admin',
    name: 'Admin',
    component: AdminPage
  },
  {
    path: '/admin/bookings',
    name: 'AdminBookings',
    component: AdminBookingsPage
  },
  {
    path: '/admin/content',
    name: 'Content',
    component: ContentPage
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router