import { useLocation, useNavigate } from "react-router-dom";
import RenderItem from "../components/RenderItem";

export default function ContentPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const content = location.state?.content;

  if (!content) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#0a2247] text-white">
        <p>Không tìm thấy nội dung phù hợp 😢</p>
        <button
          className="mt-4 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg"
          onClick={() => navigate("/")}
        >
          Quay lại trang chính
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-br from-[#0a2247] to-[#183c73] text-sky-50 p-6">
      <h1 className="text-2xl font-bold mb-6">{content.feeling.label} ✨</h1>

      <div className="flex flex-col gap-8 items-center">
        {content.items.map((item: any, i: number) => (
          <RenderItem key={i} item={item} />
        ))}
      </div>

      <button
        className="mt-10 bg-white/10 hover:bg-white/20 px-6 py-3 rounded-full"
        onClick={() => navigate("/")}
      >
        Quay lại
      </button>
    </div>
  );
}
