import { QuizFlow } from "@/components/quiz/quiz-flow";

export default function QuizPage({
  params,
}: {
  params: { tenantSlug: string };
}) {
  const { tenantSlug } = params;

  return (
    <main className="min-h-screen bg-bg">
      <QuizFlow tenantSlug={tenantSlug} />
    </main>
  );
}
