/**
 * The five stacked brand marks — the template's only ornament. Drawn from the
 * single artwork, never recoloured. `horizontal` rotates it into a band.
 */
interface Props {
  horizontal?: boolean
  length?: number
  thickness?: number
  className?: string
}

export default function MarkStrip({ horizontal = false, length = 220, thickness = 45, className = '' }: Props) {
  const w = horizontal ? length : thickness
  const h = horizontal ? thickness : length
  return (
    <div className={`relative overflow-hidden ${className}`} style={{ width: w, height: h }} aria-hidden="true">
      <img
        src={`${import.meta.env.BASE_URL}brand-marks-stack.png`}
        alt=""
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          width: thickness,
          height: length,
          transform: `translate(-50%,-50%) rotate(${horizontal ? -90 : 0}deg)`,
        }}
      />
    </div>
  )
}
