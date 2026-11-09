import { useEffect, useRef, useState } from 'react'
import { tools } from '../tools/registry.js'
import {
  ChartIcon,
  ChevronUpIcon,
  GearIcon,
  HandIcon,
  PlusIcon,
  SlidersIcon,
  StoreIcon,
} from './Icons.jsx'
import ToolTile from './ToolTile.jsx'

// الدليل التعريفي: شاشات متتالية، في كل منها جوال يعرض نسخة مبسطة من التطبيق ويد تشير إلى المكان المقصود.
// المواضع x وy نسبة مئوية داخل شاشة الجوال.
const STEPS = [
  {
    screen: 'empty',
    hand: { x: 50, y: 53 },
    title: 'أضف أدواتك',
    text: 'ابدأ من هنا: اضغط «أدوات» لتختار ما تحتاجه.',
  },
  {
    screen: 'store',
    hand: { x: 50, y: 19 },
    title: 'المتجر',
    text: 'اضغط على أي أداة لتتعرف عليها، ثم أضفها بضغطة زر.',
  },
  {
    screen: 'home',
    hand: { x: 13, y: 92 },
    title: 'المتجر دائماً قريب',
    text: 'تصل إلى المتجر في أي وقت من هذا الزر.',
  },
  {
    screen: 'sheet',
    hand: { x: 87, y: 92 },
    title: 'كل أدواتك هنا',
    text: 'اضغط السهم ليرتفع شريط أدواتك، ثم اختر الأداة التي تريدها.',
  },
  {
    screen: 'sheet',
    hand: { x: 84, y: 82 },
    drag: true,
    title: 'رتّب أدواتك',
    text: 'اضغط مطولاً على أداة، ثم اسحبها لتغيير مكانها.',
  },
  {
    screen: 'home',
    hand: { x: 50, y: 92 },
    title: 'أضف بسرعة',
    text: 'زر + يضيف جديداً في الأداة المفتوحة: ملاحظة، أو مهمة، أو غيرهما.',
  },
  {
    screen: 'home',
    hand: { x: 68, y: 92 },
    title: 'إعدادات الأداة وإحصائياتها',
    text: 'على يمين الزر + إعدادات الأداة المفتوحة، وعلى يساره إحصائياتها.',
  },
  {
    screen: 'home',
    hand: { x: 87, y: 7 },
    title: 'إعدادات التطبيق',
    text: 'ومن هنا إعدادات التطبيق كله: المظهر، والقفل، والدعم، وهذا الدليل.',
  },
]

const STORE_TOOLS = tools.slice(0, 3)
const SHEET_TOOLS = tools.slice(0, 8)

function MockTopBar() {
  return (
    <div className="mock-topbar">
      <span />
      <span className="mock-title">ساعد</span>
      <span className="mock-icon">
        <GearIcon size={14} />
      </span>
    </div>
  )
}

function MockBottomBar() {
  return (
    <div className="mock-bar">
      <span>
        <ChevronUpIcon size={15} />
      </span>
      <span>
        <SlidersIcon size={15} />
      </span>
      <span className="mock-bar-add">
        <PlusIcon size={15} />
      </span>
      <span>
        <ChartIcon size={15} />
      </span>
      <span>
        <StoreIcon size={15} />
      </span>
    </div>
  )
}

function MockScreen({ screen, drag }) {
  if (screen === 'store') {
    return (
      <div className="mock-store">
        {STORE_TOOLS.map((tool) => (
          <div className="mock-card" key={tool.id}>
            <ToolTile tool={tool} />
            <span className="mock-card-text">
              <span className="mock-line" />
              <span className="mock-line is-short" />
            </span>
          </div>
        ))}
      </div>
    )
  }

  return (
    <>
      <div className="mock-home">
        <span className="mock-line" />
        <span className="mock-line is-short" />
        {screen === 'empty' && (
          <>
            <span className="mock-plus">
              <PlusIcon size={30} />
            </span>
            <span className="mock-label">أدوات</span>
          </>
        )}
      </div>
      {screen === 'sheet' && (
        <div className="mock-sheet">
          {SHEET_TOOLS.map((tool, index) => {
            const swap = drag && index === 0 ? ' is-swap-a' : drag && index === 1 ? ' is-swap-b' : ''
            return (
              <span key={tool.id} className={`tool-tile${swap}`} style={{ background: tool.color }}>
                <tool.Icon size={17} />
              </span>
            )
          })}
        </div>
      )}
      <MockBottomBar />
    </>
  )
}

export default function Tour({ onClose }) {
  const [index, setIndex] = useState(0)
  const nextButton = useRef(null)
  const step = STEPS[index]
  const isLast = index === STEPS.length - 1

  useEffect(() => {
    nextButton.current?.focus()
  }, [index])

  useEffect(() => {
    function handleKey(event) {
      if (event.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [onClose])

  const position = { '--x': `${step.hand.x}%`, '--y': `${step.hand.y}%` }

  return (
    <div className="tour" role="dialog" aria-modal="true" aria-labelledby="tour-title">
      <div className="tour-top">
        <button type="button" className="text-button pressable" onClick={onClose}>
          تخطي
        </button>
      </div>

      <div className="tour-stage">
        <div className="tour-phone" aria-hidden="true">
          <div className="tour-screen" key={index}>
            <MockTopBar />
            <MockScreen screen={step.screen} drag={step.drag} />
            <span className="tour-ripple" style={position} />
            <span className={`tour-hand${step.drag ? ' is-drag' : ''}`} style={position}>
              <HandIcon />
            </span>
          </div>
        </div>

        <h2 className="tour-title" id="tour-title">
          {step.title}
        </h2>
        <p className="tour-text" aria-live="polite">
          {step.text}
        </p>

        <div className="tour-dots" aria-label={`الخطوة ${index + 1} من ${STEPS.length}`} role="img">
          {STEPS.map((item, dot) => (
            <span key={item.title} className={dot === index ? 'is-current' : ''} />
          ))}
        </div>

        <div className="tour-actions">
          {index > 0 && (
            <button type="button" className="tour-prev pressable" onClick={() => setIndex(index - 1)}>
              السابق
            </button>
          )}
          <button
            ref={nextButton}
            type="button"
            className="tour-next pressable"
            onClick={() => (isLast ? onClose() : setIndex(index + 1))}
          >
            {isLast ? 'ابدأ' : 'التالي'}
          </button>
        </div>
      </div>
    </div>
  )
}
