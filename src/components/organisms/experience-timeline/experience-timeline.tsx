import ExperienceCard from '@/components/molecules/experience-card';
import { EXPERIENCE_LIST } from '@/constants/experience';
import { cn } from '@/utils/shadcn';

/**
 * 經歷時間軸元件。
 *
 * 以時間軸形式展示工作經歷或學歷。
 * 在桌面版顯示為左右交錯的時間軸，在移動版則顯示為垂直列表。
 */
const ExperienceTimeline = () => {
    return (
        <div className="relative">
            {/* 中間的時間軸線 - 手機版隱藏 */}
            <div className="bg-primary absolute left-1/2 hidden h-full w-0.5 -translate-x-1/2 transform lg:block"></div>

            {/* 時間軸項目 */}
            <div className="space-y-6">
                {EXPERIENCE_LIST.map((experience, index) => {
                    const isEven = index % 2 === 0;
                    return (
                        <div key={experience.id} className="flex flex-col items-center lg:flex-row">
                            {/* 左側內容 - 偶數索引 */}
                            <div className={cn('w-full pr-0 lg:w-1/2 lg:pr-8', !isEven ? 'hidden lg:block' : '')}>
                                {isEven && <ExperienceCard experience={experience} />}
                            </div>

                            {/* 中間的圓點 - 手機版隱藏 */}
                            <div className="bg-primary z-10 hidden h-4 w-4 rounded-full border-4 lg:block"></div>

                            {/* 右側內容 - 奇數索引 */}
                            <div
                                className={cn(
                                    'w-full pl-0 lg:w-1/2 lg:pl-8',
                                    isEven ? 'hidden lg:block' : 'order-first lg:order-0'
                                )}
                            >
                                {!isEven && <ExperienceCard experience={experience} />}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default ExperienceTimeline;
