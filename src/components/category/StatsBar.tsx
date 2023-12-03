import React, { useEffect, useRef, useState } from 'react';
import { Stat } from '@/types/Stat';
import { Product } from '@/types/Product';

type StatsProps = {
    products: Product[];
    loadingTime: number | null;
    loadingTimeName: string;
};
    export default function StatsBar({ products, loadingTime, loadingTimeName = 'Render time' }: StatsProps) {
    const [stats, setStats] = useState<Stat[]>([{ id: 1, name: loadingTimeName, stat: 'Måler...' }]);
    const imagesLoaded = useRef(0);
    const imageLoadingStartTime = useRef<number | null>(null);
    const loadingInitiated = useRef(false);

    useEffect(() => {
        if (products.length > 0 && !loadingInitiated.current) {
            //  Loding initiated ref var nødvendig for at undgå at useEffect kører flere gange
            loadingInitiated.current = true;
            imageLoadingStartTime.current = performance.now();
            imagesLoaded.current = 0;

            products.forEach(product => {
                const img = new Image();
                img.src = product.ModifiedImageURL as string;
                img.onload = handleImageLoaded;
                img.onerror = () => console.error('Fejl ved indlæsning af billede');
            });
        }
    }, [products]);
    const handleImageLoaded = () => {
        imagesLoaded.current += 1;
        if (imagesLoaded.current === products.length && imageLoadingStartTime.current) {
            const imageLoadingEndTime = performance.now();
            const imageLoadingTime = (imageLoadingEndTime - imageLoadingStartTime.current) / 1000
            setStats(prevStats => [
                ...prevStats.filter(stat => stat.id !== 2),
                { id: 2, name: 'Images loading time', stat: `${imageLoadingTime.toFixed(2)}s` }
            ]);
        } else {
            setStats(prevStats => [
                ...prevStats.filter(stat => stat.id !== 2),
                { id: 2, name: 'Images Loaded', stat: `${imagesLoaded.current} of ${products.length}` }
            ]);
        }
    };

    useEffect(() => {
        setStats(prevStats => [
            ...prevStats.filter(stat => stat.id !== 1),
            { id: 1, name: loadingTimeName, stat: loadingTime ? `${loadingTime}ms` : 'Måler...' }
        ]);
    }, [loadingTime, loadingTimeName]);

    return (
        <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
            {stats.map((item) => (
                <div key={item.id} className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
                    <dt className="text-sm font-medium text-gray-500">{item.name}</dt>
                    <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">{item.stat}</dd>
                </div>
            ))}
        </dl>
    );
};
