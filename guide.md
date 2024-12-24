# folder structure

project/
├── app/
│   ├── layout.tsx               # Layout utama aplikasi
│   ├── page.tsx                 # Halaman utama aplikasi
│   ├── api/                     # Folder API routes
│   │   ├── auth/
│   │   │   ├── login.ts
│   │   │   ├── register.ts
│   │   │   └── [...nextauth].ts
│   │   └── ... (API lainnya)
│   ├── (public)/
│   │   ├── layout.tsx           # Layout umum untuk halaman publik
│   │   ├── page.tsx             # Halaman utama publik
│   │   └── ... (halaman lainnya)
│   ├── (internal)/
│   │   ├── layout.tsx           # Layout umum internal
│   │   ├── admin/
│   │   │   ├── layout.tsx       # Layout untuk admin
│   │   │   ├── dashboard.tsx    # Halaman dashboard admin
│   │   │   └── ... (halaman lainnya)
│   │   ├── staff/
│   │   │   ├── layout.tsx       # Layout untuk staff
│   │   │   ├── dashboard.tsx    # Halaman dashboard staff
│   │   │   └── ... (halaman lainnya)
│   │   ├── manager/
│   │   │   ├── layout.tsx       # Layout untuk manager
│   │   │   ├── dashboard.tsx    # Halaman dashboard manager
│   │   │   └── ... (halaman lainnya)
│   │   └── ... (flow internal lainnya)
├── slices/
│   ├── auth/
│   │   ├── components/          # Komponen spesifik fitur auth
│   │   │   ├── LoginForm.tsx    # Form login
│   │   │   ├── RegisterForm.tsx # Form registrasi
│   │   │   └── ... (komponen auth lainnya)
│   │   ├── pages/               # Halaman terkait fitur auth
│   │   │   ├── login.tsx        # Halaman login
│   │   │   ├── register.tsx     # Halaman registrasi
│   │   │   └── ... (halaman auth lainnya)
│   │   ├── lib/                 # Logika spesifik auth
│   │   │   ├── api.ts           # Logika API login/register
│   │   │   ├── validateUser.ts  # Validasi data pengguna
│   │   │   └── ... (logika auth lainnya)
│   │   ├── constants/           # Konstanta spesifik fitur auth
│   │   │   ├── formFields.ts    # Konstanta untuk formulir login/register
│   │   │   └── ... (konstanta auth lainnya)
│   │   ├── hooks/               # Hook spesifik auth
│   │   │   ├── useLogin.ts      # Hook untuk logika login
│   │   │   ├── useRegister.ts   # Hook untuk logika register
│   │   │   └── ... (hook auth lainnya)
│   │   ├── types/               # Tipe data spesifik fitur auth
│   │   │   ├── FormValues.ts    # Tipe data form login/register
│   │   │   └── ... (tipe data auth lainnya)
│   │   └── index.ts             # Entry point fitur auth
│   └── ... (fitur lainnya)
├── shared/
│   ├── dashboard/
│   │   ├── components/
│   │   │   ├── Layout.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   ├── Header.tsx
│   │   │   ├── WidgetRenderer.tsx
│   │   │   └── ... (komponen dashboard lainnya)
│   │   ├── lib/
│   │   │   ├── getUserStats.ts
│   │   │   ├── fetchWidgets.ts
│   │   │   └── ... (logika dashboard lainnya)
│   │   ├── constants/
│   │   │   ├── sidebarMenu.ts
│   │   │   ├── widgetTypes.ts
│   │   │   └── ... (konstanta dashboard lainnya)
│   │   ├── config/
│   │   │   ├── dashboardRoutes.ts
│   │   │   └── ... (konfigurasi dashboard lainnya)
│   │   ├── hooks/
│   │   │   ├── useDashboard.ts
│   │   │   ├── useWidgets.ts
│   │   │   └── ... (hook dashboard lainnya)
│   │   ├── types/
│   │   │   ├── SidebarItem.ts
│   │   │   ├── WidgetProps.ts
│   │   │   └── ... (tipe data dashboard lainnya)
│   │   └── index.ts
│   ├── auth/
│   │   ├── components/
│   │   │   ├── AuthGuard.tsx
│   │   │   ├── SessionProvider.tsx
│   │   │   └── ... (komponen auth lainnya)
│   │   ├── lib/
│   │   │   ├── token.ts
│   │   │   ├── session.ts
│   │   │   └── ... (logika auth global)
│   │   ├── constants/
│   │   │   ├── roles.ts
│   │   │   ├── endpoints.ts
│   │   │   └── ... (konstanta auth global)
│   │   ├── config/
│   │   │   ├── nextAuthConfig.ts
│   │   │   └── ... (konfigurasi auth global)
│   │   ├── hooks/
│   │   │   ├── useAuth.ts
│   │   │   ├── useRole.ts
│   │   │   └── ... (hook auth global)
│   │   ├── types/
│   │   │   ├── AuthResponse.ts
│   │   │   ├── UserType.ts
│   │   │   └── ... (tipe data auth global)
│   │   └── index.ts
│   ├── components/              # Komponen yang digunakan di seluruh aplikasi
│   │   └── ui/
│   ├── hooks/                   # Hook umum
│   ├── utils/                   # Fungsi utilitas umum
│   ├── constants/               # Konstanta global
│   ├── types/                   # Tipe global
│   ├── styles/                  # Gaya global
│   └── services/                # Layanan global
├── public/
│   ├── images/                  # Gambar statis
│   ├── icons/                   # Ikon
│   └── assets/                  # Aset statis lainnya
│       ├── fonts/               # Font kustom
│       │   ├── Roboto.ttf       # Contoh font
│       │   └── ... (font lainnya)
│       └── ... (aset lainnya)
