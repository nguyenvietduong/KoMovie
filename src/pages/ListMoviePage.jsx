import Breadcrumb from '../components/Breadcrumb';
import ListMovie from '../components/Movie/ListMovie';

export default function ListMoviePage() {

    const breadcrumbItems = [
        { label: "Trang chủ", to: '/' },
        { label: "Danh sách phim", to: '/lessons' },
    ];

    return (
        <div className="container mx-auto px-4 py-8">
            <Breadcrumb items={breadcrumbItems} />
            <ListMovie />
        </div>
    );
}