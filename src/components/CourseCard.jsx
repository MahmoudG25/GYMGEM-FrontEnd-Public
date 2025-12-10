import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, User, ArrowRight, Tag, Star, Sparkles } from 'lucide-react';

const CourseCard = ({ course, categoryTheme }) => {
    const {
        id,
        title,
        description,
        cover,
        trainer_profile,
        trainer_profile_name,
        total_duration,
        price,
        category,
        average_rating,
        level
    } = course;

    // Default theme if none provided
    const theme = categoryTheme || {
        bgColor: "bg-primary/10",
        textColor: "text-primary",
        icon: "🎓"
    };

    return (
        <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border/50 bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-primary/20">
            {/* Image Container */}
            <div className="relative aspect-[4/3] w-full overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 z-10 transition-opacity group-hover:opacity-40" />
                <img
                    className="h-full w-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
                    src={cover}
                    alt={title}
                    loading="lazy"
                />

                {/* Category Badge */}
                <div className={`absolute left-3 top-3 z-20 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold backdrop-blur-md ${theme.bgColor} ${theme.textColor} shadow-sm`}>
                    <span>{theme.icon}</span>
                    <span className="uppercase tracking-wide">{theme.label || "Course"}</span>
                </div>

                {/* Rating Badge or New Badge */}
                {average_rating ? (
                    <div className="absolute right-3 top-3 z-20 inline-flex items-center gap-1 rounded-full bg-background/95 backdrop-blur px-2 py-1 text-xs font-semibold shadow-sm text-foreground">
                        <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                        <span>{Number(average_rating).toFixed(1)}</span>
                    </div>
                ) : (
                    <div className="absolute right-3 top-3 z-20 inline-flex items-center gap-1 rounded-full bg-blue-600/90 backdrop-blur px-2.5 py-1 text-xs font-bold shadow-sm text-white tracking-wide">
                        <Sparkles className="h-3.5 w-3.5 fill-white text-white" />
                        <span>NEW</span>
                    </div>
                )}

                {/* Price Tag Overlay */}
                <div className="absolute right-3 bottom-3 z-20">
                    <div className="flex items-center justify-center rounded-lg bg-[#FF8211] px-3.5 py-1.5 shadow-lg shadow-orange-500/20 group-hover:scale-105 transition-transform">
                        <span className="font-bebas text-lg text-white tracking-wide">
                            ${price || 0}
                        </span>
                    </div>
                </div>
            </div>

            <div className="flex flex-1 flex-col p-5">
                <div className="mb-4 space-y-2">
                    <h2 className="font-bebas text-2xl tracking-wide text-foreground group-hover:text-primary transition-colors line-clamp-2">
                        {title}
                    </h2>
                    <p className="text-sm leading-relaxed text-muted-foreground line-clamp-2">
                        {description}
                    </p>
                </div>

                <div className="mt-auto space-y-4">
                    {/* Metadata */}
                    <div className="flex items-center justify-between border-t border-border pt-4 text-xs font-medium text-muted-foreground">
                        <div className="flex items-center gap-1.5">
                            <User className="h-3.5 w-3.5 text-primary" />
                            <Link to={`/trainer-profile/${trainer_profile}`} className="hover:text-foreground transition-colors truncate max-w-[100px]">
                                {trainer_profile_name}
                            </Link>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <Clock className="h-3.5 w-3.5 text-primary" />
                            <span>{Math.ceil(total_duration / 3600)} Hours</span>
                        </div>
                    </div>

                    {/* Level Badge - Added as requested */}
                    <div className="text-xs font-medium text-muted-foreground pt-2">
                        <span className="bg-primary/5 text-primary px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider">
                            {level === 1 ? "Beginner" : level === 2 ? "Intermediate" : level === 3 ? "Advanced" : "All Levels"}
                        </span>
                    </div>

                    {/* Action Button */}
                    <Link
                        to={`/courses/${id}`}
                        className="group/btn relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary/90 hover:shadow-lg active:scale-95"
                    >
                        <span>View Details</span>
                        <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                    </Link>
                </div>
            </div>
        </article>
    );
};

export default CourseCard;
