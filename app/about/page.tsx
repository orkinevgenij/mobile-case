// app/about/page.tsx
export default function AboutPage() {
    return (
        <div className="min-h-screen bg-gray-50 py-10 px-5 flex flex-col items-center">
            <h1 className="text-3xl font-bold mb-6">Про наш магазин</h1>
            <p className="text-center text-gray-700 max-w-xl mb-6">
                Ми продаємо стильні та надійні чохли для смартфонів і планшетів.
                Якість, широкий вибір та задоволені клієнти — наші головні принципи.
            </p>
            <div className="flex gap-6 text-center">
                <div>
                    <h3 className="font-semibold">Висока якість</h3>
                    <p className="text-gray-600">Чохли служать довго</p>
                </div>
                <div>
                    <h3 className="font-semibold">Широкий вибір</h3>
                    <p className="text-gray-600">Для будь-якого стилю</p>
                </div>
                <div>
                    <h3 className="font-semibold">Задоволені клієнти</h3>
                    <p className="text-gray-600">Ми дбаємо про кожного</p>
                </div>
            </div>
        </div>
    );
}
