
import connectPro from './logo.png'
function Logo({ width = "140px" }) {
  return (
    <div className="flex h-auto items-center justify-center">
      <img src={connectPro} alt="ConnectPro" style={{ width }} className="h-auto max-w-full object-contain"/>
    </div>
  )
}

export default Logo
