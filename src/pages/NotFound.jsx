import usePageMeta from '../lib/usePageMeta'
import Button from '../components/ui/Button'

export default function NotFound() {
  usePageMeta({ title: 'صفحه پیدا نشد' })

  return (
    <section className="relative overflow-hidden py-24 text-center">
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-40 grid-lines [mask-image:radial-gradient(ellipse_at_center,#000_10%,transparent_65%)]"
        aria-hidden="true"
      />
      <div className="shell">
        <span className="numeric display-1 block font-bold text-brand/15">۴۰۴</span>
        <h1 className="display-3 -mt-4 font-bold text-brand">این صفحه پیدا نشد</h1>
        <p className="mx-auto mt-3 max-w-md text-[13.5px] leading-8 text-muted">
          ممکن است نشانی را اشتباه وارد کرده باشید یا این صفحه جابه‌جا شده باشد.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button to="/" withArrow>
            بازگشت به خانه
          </Button>
          <Button to="/contact" variant="outline">
            تماس با ما
          </Button>
        </div>
      </div>
    </section>
  )
}
