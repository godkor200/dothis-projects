## 스타일 가이드

### ts, tsx
모든 ts, 변수, 파일명은 camelCase
tsx의 경우 page 컴포넌트를 제외하면 CamelCase
```typescript
// 파일명 예 - 컴포넌트
components/article/ProfileDrawer.tsx
pages/userLogin.tsx

// 파일명 예 - 그 외
serverUtils.ts
globalDomainTypes.d.ts

// 변수
const userName = "~~"

const obj = {
  userId: '~~'
}
```

### css
Rules
1. -는 네이밍 스페이스 대신으로 씀.  
클래스 네이밍을 살짝 자세하게 써주는게 더 좋음
```tsx
// components/ui/progressNavi.tsx
<nav css={style}>
    <header>
      <button class="nav-close-button">X</button>
      <div className="nav-info">
        <strong>{name}</strong>
        <span>{desc}</span>
      </div>
    </header>
</nav>
```
```css
  const style = css`
    header {
        .nav-close-button {
            width: 40px;
            height: 40px;
        }
        .nav-info {
            strong { font-size: 16px; }
            span { font-size: 14px; }
        }
    }
`
```
2. Page나 article에서 큰 블록을 기준으로 emotion css 변수를 따로 할당 
```tsx
// pages/index.tsx
<main css={indexWrapperStyle}>
    <div css={sideInfoStyle}> {...} </div>
    <div css={contentsStyle}></div>
</main>
```
