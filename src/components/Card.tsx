import React from 'react'

type CardProps = {
    wallpapers: {
        id: string;
        urls: {
            small: string;
        };
        alt_description: string | null;
    }[];
}

const handleDownload = (url: string) => {
    // directly download the image when the user clicks the download button, without opening it in a new tab
    const link = document.createElement('a');
    link.href = url;
    link.download = 'wallpaper.jpg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link); 4


}

const Card = ({ wallpapers }: CardProps) => {
    return (
        <div>
            {
                // In a real implementation, this would map over the fetched wallpapers
                // i want to also display donwload button on hover and a like button on the top right corner of each card
                wallpapers.length > 0 ? (
                    <div className="flex flex-wrap gap-6 items-center md:w-full justify-center">
                        {wallpapers.map((wallpaper) => (
                            <div key={wallpaper.id} className="bg-slate-300 dark:bg-slate-800 rounded-xl w-64 h-64 relative group overflow-hidden cursor-pointer">
                                <img
                                    src={wallpaper.urls.small}
                                    alt={wallpaper.alt_description || 'Wallpaper'}
                                    className="w-full h-full object-cover rounded-xl"
                                />
                                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button onClick={() => handleDownload(wallpaper.urls.small)} className="bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-300 p-2 rounded-full hover:bg-primary hover:text-background-dark transition-colors">
                                        <span className="material-icons-round">download</span>
                                    </button>
                                </div>
                                <div className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button className="bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-300 p-2 rounded-full hover:bg-primary hover:text-background-dark transition-colors">
                                        <span className="material-icons-round">favorite</span>
                                    </button>
                                </div>
                                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <p className="text-white text-sm">{wallpaper.alt_description || 'No description'}</p>
                                </div>

                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-slate-500 mt-10">No wallpapers found. Try searching for something else!</p>
                )
            }
        </div>
    )
}

export default Card