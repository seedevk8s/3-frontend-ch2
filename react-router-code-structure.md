# React Router v7.5.3 코드 구조 설명

## 🚀 전체 구조 개요

React Router v7의 핵심은 `createBrowserRouter`를 사용한 객체 기반 라우트 정의입니다. 

```
main.tsx (진입점)
  ↓
root.tsx (라우터 설정)
  ↓
BasicLayout (공통 레이아웃)
  ↓
페이지 컴포넌트들 (MainPage, AboutPage)
```

## 📁 1. main.tsx - 애플리케이션 진입점

```tsx
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router'
import router from './router/root'

createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router} />
)
```

**🔑 핵심 포인트:**
- `RouterProvider`를 사용하여 라우터 구성을 앱에 제공
- `router` 객체는 별도 파일(`root.tsx`)에서 정의

## 📁 2. root.tsx - 라우터 설정

```tsx
import { lazy, Suspense } from "react"
import { createBrowserRouter } from "react-router"
import BasicLayout from "../layouts/basicLayout"

// Lazy Loading으로 성능 최적화
const Main = lazy(() => import("../pages/mainPage"))
const About = lazy(() => import("../pages/aboutPage"))

const router = createBrowserRouter([
  {
    path: "",  // 루트 경로
    Component: BasicLayout,  // 공통 레이아웃
    children: [
      {
        index: true,  // 기본 페이지 (/)
        element: <Suspense fallback={<Loading />}><Main /></Suspense>,
      },
      {
        path: 'about',  // /about 경로
        element: <Suspense fallback={<Loading />}><About /></Suspense>,
      }
    ],
  } 
])

export default router
```

**🔑 핵심 포인트:**
- `createBrowserRouter`로 라우터 생성
- 객체 기반 라우트 정의
- `children` 속성으로 중첩 라우트 구현
- `lazy`와 `Suspense`로 코드 스플리팅

## 📁 3. basicLayout.tsx - 공통 레이아웃

```tsx
import { Outlet } from "react-router"

function BasicLayout() {
  return (
    <>
      {/* 헤더 영역 - 모든 페이지에 공통으로 표시 */}
      <header className="bg-teal-400 p-5">
        <h1 className="text-2xl md:text-4xl">Header</h1>
      </header>
      
      <div className="bg-white my-5 w-full flex flex-col space-y-4 md:flex-row md:space-x-4 md:space-y-0">
        {/* 메인 컨텐츠 영역 - Outlet으로 자식 라우트 렌더링 */}
        <main className="bg-sky-300 md:w-2/3 px-5 py-40">
          <Outlet />  {/* 👈 여기에 MainPage나 AboutPage가 렌더링됨 */}
        </main>
        
        {/* 사이드바 영역 - 모든 페이지에 공통으로 표시 */}
        <aside className="bg-green-300 md:w-1/3 lg:w-1/4 px-5 py-40">
          <h1 className="text-2xl md:text-4xl">Sidebar</h1>
        </aside>
      </div>
    </>
  )
}
```

**🔑 핵심 포인트:**
- `Outlet` 컴포넌트가 자식 라우트의 위치 지정
- 헤더와 사이드바는 모든 페이지에서 공통으로 표시
- 반응형 디자인 적용 (Tailwind CSS)

## 📁 4. mainPage.tsx - 메인 페이지

```tsx
import { NavLink } from "react-router"

function MainPage() {
  return ( 
    <div className="text-3xl">
      {/* 네비게이션 링크 */}
      <div className="flex">
        <NavLink to='/about'>About</NavLink>
      </div>

      {/* 페이지 컨텐츠 */}
      <div>Main Page</div>
    </div>
  )
}

export default MainPage
```

**🔑 핵심 포인트:**
- `NavLink`로 다른 페이지로 이동
- 경로: `/` (루트)
- `index: true`로 기본 페이지 지정

## 📁 5. aboutPage.tsx - About 페이지

```tsx
import { NavLink } from "react-router"

function AboutPage() {
  return ( 
    <div className="text-3xl">
      {/* 네비게이션 링크 */}
      <div className="flex">
        <NavLink to='/'>Main</NavLink>
      </div>

      {/* 페이지 컨텐츠 */}
      <div>About Page</div>
    </div>
  )
}

export default AboutPage
```

**🔑 핵심 포인트:**
- 경로: `/about`
- NavLink로 메인 페이지로 돌아가기

## 🎯 주요 특징 정리

### 1. 객체 기반 라우트 정의
```tsx
createBrowserRouter([
  {
    path: "",
    Component: BasicLayout,
    children: [...]
  }
])
```

### 2. Lazy Loading + Suspense
```tsx
const Main = lazy(() => import("../pages/mainPage"))
// ...
element: <Suspense fallback={<Loading />}><Main /></Suspense>
```

### 3. Layout 패턴
```tsx
// BasicLayout에서
<Outlet />  // 자식 라우트가 여기에 렌더링
```

### 4. NavLink 사용
```tsx
<NavLink to='/about'>About</NavLink>
// 현재 경로에 따라 활성화 스타일 적용 가능
```

## 🔄 라우팅 흐름

1. 사용자가 URL에 접근 (예: `/about`)
2. `createBrowserRouter`가 경로 매칭
3. `BasicLayout` 컴포넌트 렌더링
4. `Outlet` 위치에 해당 페이지 (`AboutPage`) 렌더링
5. 결과: 헤더 + AboutPage + 사이드바 표시

이러한 구조로 React Router v7은 보다 선언적이고 직관적인 라우팅을 제공합니다.
