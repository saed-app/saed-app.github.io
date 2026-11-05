// اختيار واحد من عدة خيارات. يعتمد على أزرار الراديو الأصلية حتى يعمل بلوحة المفاتيح
export default function Segmented({ name, labelledBy, options, value, onChange }) {
  return (
    <div className="segmented" role="radiogroup" aria-labelledby={labelledBy}>
      {options.map((option) => (
        <label
          key={option.value}
          className={`segmented-option pressable${option.value === value ? ' is-selected' : ''}`}
        >
          <input
            type="radio"
            name={name}
            value={option.value}
            checked={option.value === value}
            onChange={() => onChange(option.value)}
          />
          {option.label}
        </label>
      ))}
    </div>
  )
}
