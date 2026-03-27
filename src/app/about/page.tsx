import type { Metadata } from 'next';
import SectionTitle from '@/components/atoms/section-title';
import AuthorCard from '@/components/molecules/author-card';
import IntroCard from '@/components/molecules/intro-card';
import ProjectCard from '@/components/molecules/project-card';
import SkillCard from '@/components/molecules/skill-card';
import ExperienceTimeline from '@/components/organisms/experience-timeline';
import { ABOUT_INTRO_LIST } from '@/constants/intro';
import { generateAboutMetadata } from '@/constants/metadatas';
import { PROJECT_LIST } from '@/constants/project';
import { SKILL_LIST } from '@/constants/skill';

export const metadata: Metadata = generateAboutMetadata();

/**
 * 關於頁面元件。
 *
 * 顯示作者的詳細介紹、經歷、技能和專案列表。
 */
const AboutPage = () => {
    return (
        <div className="mx-auto max-w-6xl space-y-4 md:space-y-8">
            <section className="space-y-4 md:space-y-8">
                {/* 作者卡片 */}
                <AuthorCard className="mx-auto" />
                {/* 簡短介紹卡片 */}
                <IntroCard className="mx-auto my-6 max-w-3xl md:my-0" list={ABOUT_INTRO_LIST} />
            </section>
            <section className="space-y-4 md:space-y-8">
                <SectionTitle id="experience" className="text-center">
                    Experience
                </SectionTitle>
                {/* 經歷時間軸 */}
                <ExperienceTimeline />
            </section>
            <section className="space-y-4 md:space-y-8">
                <SectionTitle id="skills" className="text-center">
                    Skills
                </SectionTitle>
                {/* 技能卡片 */}
                <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
                    {SKILL_LIST.map((skill) => (
                        <SkillCard key={skill.id} title={skill.title} skills={skill.skills} />
                    ))}
                </div>
            </section>
            <section className="space-y-4 md:space-y-8">
                <SectionTitle id="projects" className="text-center">
                    Projects
                </SectionTitle>
                {/* 專案卡片 */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {PROJECT_LIST.map((project) => (
                        <ProjectCard key={project.id} project={project} />
                    ))}
                </div>
            </section>
        </div>
    );
};

export default AboutPage;
