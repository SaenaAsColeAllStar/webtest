import { CHAPTERS_V21 } from '@/lib/chapters';

interface ScrollProgressProps {
  progress: number;
}

export function ScrollProgress({ progress }: ScrollProgressProps) {
  const activeChapter =
    CHAPTERS_V21.find((_, i, arr) => {
      const start = i / arr.length;
      const end = (i + 1) / arr.length;
      return progress >= start && progress < end;
    }) ?? CHAPTERS_V21[CHAPTERS_V21.length - 1];

  return (
    <>
      <div
        className="scroll-progress"
        role="progressbar"
        aria-valuenow={Math.round(progress * 100)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Kemajuan scroll halaman"
        style={{ transform: `scaleX(${progress})` }}
      />
      <div className="scroll-progress-chapters" aria-hidden="true">
        {CHAPTERS_V21.map((chapter) => (
          <a
            key={chapter.id}
            href={`#${chapter.id}`}
            className={`scroll-progress-chapters__dot ${activeChapter.id === chapter.id ? 'is-active' : ''}`}
            title={chapter.label}
          />
        ))}
      </div>
    </>
  );
}
