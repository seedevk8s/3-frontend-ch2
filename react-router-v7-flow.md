# React Router v7 상세 플로우

## 1. 브라우저 & HTML 초기화

```
[Browser] → [index.html] → [main.tsx]
```

- 브라우저가 index.html을 로드
- index.html의 `<script>` 태그로 main.tsx 실행
- React 애플리케이션 초기화 시작

## 2. React Router 초기화

```
[main.tsx] → [RouterProvider] → [router.tsx]
```

- main.tsx에서 RouterProvider 컴포넌트 렌더링
- router.tsx에서 정의된 라우트 구성 로드
- 현재 URL을 분석하여 매칭되는 라우트 찾기

## 3. 라우트 매칭 & 데이터 로딩

```
[URL] → [Route Matcher] → [Matched Route] → [Loader Functions]
```

- 현재 URL과 라우트 정의를 비교
- 매칭된 라우트의 loader 함수 실행
- 중첩된 라우트가 있는 경우 병렬로 모든 loader 실행

## 4. 컴포넌트 렌더링 체인

```
[RootLayout] → [Outlet] → [Child Layout] → [Outlet] → [Page Component]
```

- 최상위 RootLayout부터 렌더링 시작
- Outlet을 통해 자식 컴포넌트 렌더링
- loader에서 받은 데이터를 useLoaderData()로 사용

## 5. 사용자 인터랙션 처리

```
[User Action] → [Navigation/Form] → [Action Function] → [Loader Revalidation]
```

- 링크 클릭 또는 폼 제출 발생
- action 함수가 있다면 실행 (주로 데이터 수정)
- URL 변경 시 새로운 loader 실행
- UI 업데이트

## 6. 에러 처리 플로우

```
[Error in Loader/Action/Component] → [Error Boundary] → [errorElement]
```

- 에러 발생 시 가장 가까운 Error Boundary가 처리
- 라우트에 정의된 errorElement 컴포넌트 표시

## 완전한 흐름도

```
[Browser]
  └─→ [index.html]
       └─→ [main.tsx]
            └─→ [RouterProvider]
                 └─→ [router.tsx]
                      ├─→ [Route Matching]
                      │    └─→ [URL Analysis]
                      ├─→ [Loader Phase]
                      │    ├─→ [Root Loader]
                      │    └─→ [Child Loaders]
                      └─→ [Render Phase]
                           ├─→ [RootLayout]
                           │    └─→ [Outlet]
                           ├─→ [Child Layout]
                           │    └─→ [Outlet]
                           └─→ [Page Component]
                                ├─→ [useLoaderData()]
                                ├─→ [useActionData()]
                                └─→ [useNavigate()]

[User Interaction]
  ├─→ [Link Click] → [Client-side Navigation]
  └─→ [Form Submit] → [Action Function] → [Revalidation]

[Error Handling]
  └─→ [Error Boundary] → [errorElement]
```

## 주요 React Router v7 특징

1. **데이터 우선 접근**: 라우트 렌더링 전에 loader로 데이터를 미리 로드
2. **중첩 라우팅**: Outlet을 통한 컴포넌트 중첩 구조
3. **에러 경계**: errorElement를 통한 선언적 에러 처리
4. **액션 패턴**: form 제출을 action 함수로 처리
5. **자동 재검증**: action 후 관련 loader 자동 재실행

이런 구조로 React Router v7은 데이터 로딩과 UI 렌더링을 효율적으로 관리합니다!