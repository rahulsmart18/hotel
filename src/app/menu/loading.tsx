export default function MenuLoading() {
  return (
    <div className="mx-auto max-w-6xl px-4 pb-24 pt-12 sm:px-6 lg:px-8">
      <div className="max-w-3xl space-y-4">
        <div className="h-3 w-32 animate-pulse rounded-full bg-gold/20" />
        <div className="h-14 w-full max-w-md animate-pulse rounded-lg bg-muted/30" />
        <div className="h-20 max-w-2xl animate-pulse rounded-lg bg-muted/20" />
      </div>
      <div className="mt-12 h-24 animate-pulse rounded-xl border border-border/40 bg-muted/15" />
      <div className="mt-10 grid gap-7 sm:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="overflow-hidden rounded-2xl border border-border/40 bg-muted/10"
          >
            <div className="aspect-[5/4] animate-pulse bg-muted/25" />
            <div className="space-y-3 p-5">
              <div className="h-3 w-20 animate-pulse rounded bg-muted/30" />
              <div className="h-6 w-[88%] max-w-sm animate-pulse rounded bg-muted/25" />
              <div className="h-10 w-full animate-pulse rounded bg-muted/15" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
