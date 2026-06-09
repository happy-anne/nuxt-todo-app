const version = process.versions.node
const [major, minor] = version.split('.').map(Number)

function isSupported(major, minor) {
  if (major >= 26) return true
  if (major === 24 && minor >= 11) return true
  if (major === 23) return true
  if (major === 22 && minor >= 12) return true
  return false
}

if (!isSupported(major, minor)) {
  console.error(`
❌ Node.js ${version} 은(는) Nuxt 4에서 지원하지 않습니다.

필요 버전: Node 22.12+ / 23.x / 24.11+ / 26+

현재 셸에서 사용 중인 node 경로:
  ${process.execPath}

해결 방법:
  1. Homebrew Node 사용 (권장)
     export PATH="/opt/homebrew/bin:$PATH"
     node -v   # v22.12 이상인지 확인

  2. 또는 Node 22 LTS 설치
     brew install node@22
     brew link node@22 --force --overwrite

그 다음:
  cd ~/nuxt-todo
  npm run dev
`)
  process.exit(1)
}
