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
import { useIsLaptop } from '../core/viewport.js'

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
    hand: { x: 85, y: 16 },
    title: 'كل أدواتك هنا',
    text: 'اضغط السهم فيصعد ويظهر شريط أدواتك الطويل، ثم اختر الأداة التي تريدها.',
  },
  {
    screen: 'sheet',
    hand: { x: 85, y: 23 },
    drag: true,
    title: 'رتّب أدواتك',
    text: 'اضغط مطولاً على أداة، ثم اسحبها لتغيير مكانها.',
  },
  {
    screen: 'home',
    hand: { x: 50, y: 92 },
    title: 'صفحة الأداة',
    text: 'لكل أداة ثلاث صفحات. زر + هو صفحتها الأساسية: تكتب ملاحظة جديدة، أو تبدأ مهامك.',
  },
  {
    screen: 'home',
    hand: { x: 68, y: 92 },
    title: 'إعدادات الأداة وإحصائياتها',
    text: 'على يمين الزر + إعدادات الأداة، وعلى يساره إحصائياتها وتتبع إنجازك فيها.',
  },
  {
    screen: 'home',
    hand: { x: 87, y: 7 },
    title: 'إعدادات التطبيق',
    text: 'ومن هنا إعدادات التطبيق كله: المظهر، والقفل، والدعم، وهذا الدليل.',
  },
]

// دليل مبدئي للابتوب، ويُراجع مع دليل الجوال قبل النشر في المتاجر
const LAPTOP_STEPS = [
  {
    screen: 'empty',
    hand: { x: 50, y: 51 },
    title: 'أضف أدواتك',
    text: 'ابدأ من هنا: اضغط «أدوات» لتختار ما تحتاجه.',
  },
  {
    screen: 'store',
    hand: { x: 82, y: 25 },
    title: 'المتجر',
    text: 'اضغط على أي أداة لتتعرف عليها، ثم أضفها بضغطة زر.',
  },
  {
    screen: 'home',
    hand: { x: 95, y: 8 },
    title: 'إعدادات التطبيق',
    text: 'من هذا الزر تفتح لوحة الإعدادات على اليسار: ملفك، والمظهر، والقفل، والدعم.',
  },
  {
    screen: 'panel',
    hand: { x: 16, y: 28 },
    title: 'المتجر دائماً قريب',
    text: 'تصل إلى المتجر في أي وقت من لوحة الإعدادات.',
  },
  {
    screen: 'strip',
    hand: { x: 50, y: 95 },
    title: 'كل أدواتك هنا',
    text: 'اضغط السهم في أسفل الشاشة ليرتفع شريط أدواتك، واضغطه مرة أخرى ليعود.',
  },
  {
    screen: 'strip',
    hand: { x: 73, y: 83 },
    drag: true,
    title: 'رتّب أدواتك',
    text: 'اضغط مطولاً على أداة، ثم اسحبها لتغيير مكانها.',
  },
  {
    screen: 'tool',
    hand: { x: 5, y: 21 },
    title: 'صفحة الأداة',
    text: 'في وسط الشاشة الصفحة الأساسية للأداة، ومن زر في أعلاها تفتح إحصائياتها.',
  },
  {
    screen: 'tool',
    hand: { x: 87, y: 38 },
    title: 'إعدادات الأداة',
    text: 'إعدادات الأداة المفتوحة في البطاقة على اليمين، والأداة نفسها في الوسط.',
  },
]

const STORE_TOOLS = tools.slice(0, 3)
const SHEET_TOOLS = tools.slice(0, 8)
const LAPTOP_STORE_TOOLS = tools.slice(0, 6)

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

function MockBottomBar({ arrowUp }) {
  return (
    <div className="mock-bar">
      <span style={arrowUp ? { visibility: 'hidden' } : undefined}>
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

function MockArrow() {
  return (
    <span className="mock-arrow">
      <ChevronUpIcon size={13} />
    </span>
  )
}

function MockLaptopScreen({ screen, drag }) {
  if (screen === 'store') {
    return (
      <div className="mock-store is-grid">
        {LAPTOP_STORE_TOOLS.map((tool) => (
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

  if (screen === 'tool') {
    return (
      <>
        <div className="mock-tool-head">
          <ToolTile tool={tools[0]} />
          <span className="mock-line is-short" />
          <span className="mock-tool-actions">
            <span className="mock-icon">
              <ChartIcon size={13} />
            </span>
          </span>
        </div>
        <div className="mock-tool-body">
          <div className="mock-tool-side">
            <span className="mock-line" />
            <span className="mock-line is-short" />
            <span className="mock-line" />
          </div>
          <div className="mock-tool-main">
            <span className="mock-line" />
            <span className="mock-line" />
            <span className="mock-line is-short" />
          </div>
        </div>
        <MockArrow />
      </>
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
      {screen === 'strip' && (
        <div className="mock-sheet is-laptop">
          {LAPTOP_STORE_TOOLS.map((tool, index) => {
            const swap = drag && index === 0 ? ' is-swap-a' : drag && index === 1 ? ' is-swap-b' : ''
            return (
              <span key={tool.id} className={`tool-tile${swap}`} style={{ background: tool.color }}>
                <tool.Icon size={17} />
              </span>
            )
          })}
        </div>
      )}
      <MockArrow />
      {screen === 'panel' && (
        <>
          <span className="mock-panel-scrim" />
          <div className="mock-panel">
            {['ملفي', 'المتجر', 'المظهر والتفضيلات', 'الدعم', 'حول التطبيق'].map((label) => (
              <span className="mock-panel-row" key={label}>
                {label}
              </span>
            ))}
          </div>
        </>
      )}
    </>
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
          <span className="mock-sheet-arrow" style={{ transform: 'rotate(180deg)' }}>
            <ChevronUpIcon size={15} />
          </span>
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
      <MockBottomBar arrowUp={screen === 'sheet'} />
    </>
  )
}

export default function Tour({ onClose }) {
  const [index, setIndex] = useState(0)
  const nextButton = useRef(null)
  const isLaptop = useIsLaptop()
  const steps = isLaptop ? LAPTOP_STEPS : STEPS
  const step = steps[index]
  const isLast = index === steps.length - 1

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

      <div className={`tour-stage${isLaptop ? ' is-laptop' : ''}`}>
        <div className={`tour-phone${isLaptop ? ' is-laptop' : ''}`} aria-hidden="true">
          <div className="tour-screen" key={index}>
            <MockTopBar />
            {isLaptop ? (
              <MockLaptopScreen screen={step.screen} drag={step.drag} />
            ) : (
              <MockScreen screen={step.screen} drag={step.drag} />
            )}
            <span className="tour-ripple" style={position} />
            <span className={`tour-hand${step.drag ? (isLaptop ? ' is-drag' : ' is-drag-y') : ''}`} style={position}>
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

        <div className="tour-dots" aria-label={`الخطوة ${index + 1} من ${steps.length}`} role="img">
          {steps.map((item, dot) => (
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
