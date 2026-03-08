import { allProjects } from '@/data/projects';
import { notFound } from 'next/navigation';
import ProjectDetail from '@/components/ProjectDetail';

interface Props {
  params: Promise<{ id: string }>;
}

export function generateStaticParams() {
  return allProjects.map((project) => ({
    id: project.id,
  }));
}

export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  const project = allProjects.find((p) => p.id === id);
  if (!project) return { title: 'Project Not Found' };

  return {
    title: `${project.title} | 박해남 Portfolio`,
    description: project.subtitle,
  };
}

export default async function ProjectPage({ params }: Props) {
  const { id } = await params;
  const project = allProjects.find((p) => p.id === id);

  if (!project) {
    notFound();
  }

  return <ProjectDetail project={project} />;
}
