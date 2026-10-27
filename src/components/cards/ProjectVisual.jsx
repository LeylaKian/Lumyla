const BAR_HEIGHTS = [38, 56, 44, 72, 62, 88]

export default function ProjectVisual({ kind = 'browser', palette = ['#350103', '#905954', '#EFE2DA'] }) {
  const [primary, secondary, surface] = palette

  return (
    <div
      className="relative h-full w-full overflow-hidden"
      style={{ background: `linear-gradient(140deg, ${surface} 0%, #FFFFFF 58%, ${surface} 100%)` }}
    >
      <div
        className="absolute -end-10 -top-10 h-32 w-32 rounded-full opacity-40 blur-2xl"
        style={{ background: primary }}
      />

      {kind === 'browser' && (
        <div className="absolute inset-x-[9%] top-[12%] overflow-hidden rounded-2xl border border-white bg-white shadow-[0_24px_50px_-30px_rgba(46,0,2,0.55)]">
          <div className="flex items-center gap-1.5 border-b border-brand/[0.06] bg-[#FCFBFA] px-3 py-2">
            <span className="h-1.5 w-1.5 rounded-full" style={{ background: secondary }} />
            <span className="h-1.5 w-1.5 rounded-full bg-brand/15" />
            <span className="mx-auto h-2.5 w-1/3 rounded-full bg-brand/[0.06]" />
          </div>
          <div className="p-3">
            <div className="flex items-center justify-between">
              <span className="h-2 w-8 rounded-full" style={{ background: primary }} />
              <span className="h-3 w-10 rounded-full" style={{ background: primary }} />
            </div>
            <div className="mt-3 grid grid-cols-[1.1fr_1fr] gap-2">
              <div className="space-y-1.5 pt-1">
                <span className="block h-2 w-full rounded-full" style={{ background: primary, opacity: 0.8 }} />
                <span className="block h-2 w-3/4 rounded-full" style={{ background: secondary, opacity: 0.6 }} />
                <span className="block h-1 w-full rounded-full bg-brand/10" />
                <span className="block h-1 w-4/5 rounded-full bg-brand/10" />
              </div>
              <div
                className="h-16 rounded-xl"
                style={{ background: `linear-gradient(135deg, ${secondary}, ${surface})` }}
              />
            </div>
          </div>
        </div>
      )}

      {kind === 'dashboard' && (
        <div className="absolute inset-x-[8%] top-[14%] rounded-2xl border border-white bg-white/95 p-3 shadow-[0_24px_50px_-30px_rgba(46,0,2,0.5)]">
          <div className="flex items-center justify-between">
            <span className="h-1.5 w-14 rounded-full bg-brand/15" />
            <span className="h-4 w-4 rounded-full" style={{ background: surface }} />
          </div>
          <div className="mt-3 flex h-[70px] items-end gap-1.5">
            {BAR_HEIGHTS.map((height, index) => (
              <span
                key={index}
                className="flex-1 rounded-t-md"
                style={{
                  height: `${height}%`,
                  background:
                    index === BAR_HEIGHTS.length - 1
                      ? primary
                      : index % 2 === 0
                        ? secondary
                        : surface,
                  opacity: index === BAR_HEIGHTS.length - 1 ? 1 : 0.85,
                }}
              />
            ))}
          </div>
          <div className="mt-2 flex items-center justify-between">
            <span className="h-1 w-8 rounded-full bg-brand/10" />
            <span className="h-1 w-6 rounded-full bg-brand/10" />
            <span className="h-1 w-10 rounded-full bg-brand/10" />
          </div>
        </div>
      )}

      {kind === 'brand' && (
        <div className="absolute inset-0 grid place-items-center p-[10%]">
          <div className="grid w-full grid-cols-[1.15fr_1fr] gap-2.5">
            <div
              className="grid aspect-square place-items-center rounded-2xl shadow-[0_20px_40px_-26px_rgba(46,0,2,0.6)]"
              style={{ background: `linear-gradient(140deg, ${primary}, ${secondary})` }}
            >
              <span className="text-3xl font-bold text-white/90">ل</span>
            </div>
            <div className="space-y-2">
              <div className="rounded-xl bg-white/85 p-2 shadow-sm">
                <span className="block text-[13px] font-semibold" style={{ color: primary }}>
                  آا ب پ
                </span>
                <span className="mt-1 block h-1 w-2/3 rounded-full bg-brand/10" />
              </div>
              <div className="grid grid-cols-3 gap-1.5">
                {[primary, secondary, surface].map((color) => (
                  <span
                    key={color}
                    className="h-7 rounded-lg ring-1 ring-white/70"
                    style={{ background: color }}
                  />
                ))}
              </div>
              <div className="rounded-xl bg-white/85 p-2">
                <span className="block h-1 w-3/4 rounded-full bg-brand/10" />
                <span className="mt-1 block h-1 w-1/2 rounded-full bg-brand/10" />
              </div>
            </div>
          </div>
        </div>
      )}

      {kind === 'mobile' && (
        <div className="absolute inset-0 flex items-end justify-center gap-2 px-[12%] pb-[8%]">
          <div className="h-[64%] w-[34%] overflow-hidden rounded-[18px] border-[3px] border-white bg-white shadow-[0_20px_44px_-26px_rgba(46,0,2,0.55)]">
            <div
              className="h-16"
              style={{ background: `linear-gradient(150deg, ${primary}, ${secondary})` }}
            />
            <div className="space-y-1.5 p-2">
              <span className="block h-1.5 w-full rounded-full bg-brand/12" />
              <span className="block h-1.5 w-3/4 rounded-full bg-brand/12" />
              <span className="mt-2 block h-8 rounded-lg" style={{ background: surface }} />
            </div>
          </div>
          <div className="mb-4 h-[52%] w-[26%] overflow-hidden rounded-[14px] border-[3px] border-white bg-white shadow-[0_20px_44px_-30px_rgba(46,0,2,0.5)]">
            <div className="p-1.5">
              <span className="block h-10 rounded-md" style={{ background: secondary, opacity: 0.5 }} />
              <span className="mt-1.5 block h-1 w-full rounded-full bg-brand/12" />
              <span className="mt-1 block h-1 w-2/3 rounded-full bg-brand/12" />
            </div>
          </div>
        </div>
      )}

      {kind === 'wireframe' && (
        <div className="absolute inset-0 grid place-items-center p-[12%]">
          <div className="relative w-full rounded-2xl border border-dashed border-mauve/40 bg-white/70 p-3 backdrop-blur-sm">
            <div className="flex items-center justify-between">
              <span className="h-1.5 w-10 rounded-full bg-mauve/40" />
              <span className="h-3 w-3 rounded-full border border-dashed border-mauve/50" />
            </div>
            <div className="mt-2 space-y-1.5">
              <span className="block h-2 w-full rounded-full bg-mauve/25" />
              <span className="block h-2 w-2/3 rounded-full bg-mauve/20" />
            </div>
            <div className="mt-2 grid grid-cols-3 gap-1.5">
              {[0, 1, 2].map((index) => (
                <span
                  key={index}
                  className="h-7 rounded-lg border border-dashed border-mauve/35"
                  style={{ background: index === 1 ? `${primary}12` : 'transparent' }}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
