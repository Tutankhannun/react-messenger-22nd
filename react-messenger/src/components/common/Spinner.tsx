const Spinner = () => {
  return (
    // 화면 전체를 덮는 배경을 만들어 스피너를 중앙에 배치
    <div className="w-full h-screen flex items-center justify-center bg-white">
      <span className="loader"></span>
    </div>
  );
};

export default Spinner;
