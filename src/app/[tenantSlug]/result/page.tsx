import { QuizResult } from "@/components/quiz/quiz-result";

export default function ResultPage({
  params,
}: {
  params: { tenantSlug: string };
}) {
  const { tenantSlug } = params;

  return <QuizResult tenantSlug={tenantSlug} />;
}
