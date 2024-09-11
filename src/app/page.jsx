"use client";
import { useState, useEffect } from 'react';

export default function Home() {

  const [animeData, setAnimeData] = useState([]);
  const [animeDataDetail, setAnimeDataDetail] = useState([]);

  useEffect(() => {
    fetchAnime();
    fetchAnimeDeatail();
  }, [animeDataDetail.mal_id]);

  const [isOpenModal, setIsModalOpen] = useState(false);

  const toggleModal = (id) => {
    setIsModalOpen(!isOpenModal);
  };

  const handleOutsideClick = (e) => {
    if (e.target === e.currentTarget) {
      setIsModalOpen(false);
    }
  };


  //กำหนดตัวแปรชื่อ fetchAnime แลตั้งเป็น Async เพื่อให้รอโหลด API ให้เข้ามาก่อน
  const fetchAnime = async () => {
    try {
      const response = await fetch(`https://api.jikan.moe/v4/anime`);
      const data = await response.json();
      if (response.ok) {
        setAnimeData(data.data);
      }
    } catch (error) {
      window.alert('มีข้อผิดพลาดเกี่ยวกับเซิฟเวอร์')
    }
  }

  const fetchAnimeDeatail = async (id) => {
    console.log(id)
    try {
      const response = await fetch(`https://api.jikan.moe/v4/anime/${id}/full`);
      const data = await response.json();
      if (response.ok) {
        setAnimeDataDetail(data.data);
        setIsModalOpen(true);
      }
    } catch (error) {
      window.alert('มีข้อผิดพลาดเกี่ยวกับเซิฟเวอร์')
    }
  }


  return (
    <div className="w-[85%] mx-auto">
      <h1 className="text-3xl font-semibold my-4 text-[#38b6ff]">ANIME-API</h1>
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4">

        {animeData.length > 0 ? (
          animeData.map((anime) => (
            <div key={anime.mal_id} className="overflow-hidden shadow-2xl" onClick={() => fetchAnimeDeatail(anime.mal_id)}>
              <div className="h-[15rem] flex">

                <div className="h-full flex items-center flex-col overflow-hidden justify-between text-white w-[3rem]">
                  <div className="-rotate-90 w-[20rem] truncate text-xl px-2">
                    {anime.title}
                  </div>

                  <div className="text-2xl font-semibold text-[#38b6ff]">
                    {anime.mal_id}
                  </div>
                </div>

                <div className="relative">
                  <img className="w-full h-full object-cover hover:bg-black" src={anime.images.jpg.image_url} alt={`รูปภาพของ ${anime.mal_id}`} />
                  <div className="absolute top-0 w-full h-full group hover:backdrop-blur-sm transition-all duration-300 flex items-center justify-center">
                  <svg className="opacity-0 group-hover:opacity-100" width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill="white" fill-rule="evenodd" clip-rule="evenodd"><path d="M23 12l-22 12v-24l22 12zm-21 10.315l18.912-10.315-18.912-10.315v20.63z"/></svg>
                  </div>
                </div>

              </div>
            </div>
          ))
        ) : (
          <div>
            ไม่มีข้อมูลอนิเมะ
          </div>
        )}
      </div>

      {animeDataDetail && (
        <div
          className={`fixed inset-0 z-50 flex items-center justify-center bg-black/60 bg-opacity-50 transition-opacity duration-300 ${isOpenModal ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
          onClick={handleOutsideClick}
        >
          <div className={`relative flex flex-col h-[80%] w-[80%] mx-auto text-white gap-4 bg-black/60 p-8 shadow-lg  transition-transform duration-300 ${isOpenModal ? 'scale-100' : 'scale-90'}`}>
            <div className="flex items-center justify-start md:justify-end">
              <button onClick={() => toggleModal(animeDataDetail.mal_id)}>
                &#x2715;
              </button>
            </div>
            <div className="flex flex-col md:flex-row gap-4 overflow-y-scroll no-scrollbar">
              <div className="overflow-hidden rounded-lg">
                <img className="w-full h-full object-cover" src={animeDataDetail?.images?.jpg?.image_url} alt={`รูปภาพของ ${animeDataDetail?.mal_id}`} />
              </div>
              <div className="w-full md:w-[60%]">
                <span>{animeDataDetail.type}</span> &#9679; <span>{animeDataDetail.title}</span>
                <p className="text-2xl font-semibold">{animeDataDetail.title}</p>
                <div className="mt-2 flex flex-wrap gap-2">

                  <div className="border px-2 rounded">
                    {animeDataDetail.rating}
                  </div>

                  <div className="border px-2 rounded">
                    {animeDataDetail.episodes}
                  </div>
                </div>

                <div className="mt-2 flex gap-2">
                  <span>{animeDataDetail.type}</span>
                  &#9679;
                  <span>{animeDataDetail.duration}</span>
                </div>

                <p className="mt-2 text-justify h-[15rem] overflow-hidden">{animeDataDetail.synopsis}</p>
              </div>
            </div>

          </div>

        </div>
      )}

      <footer className="p-4 flex items-center justify-center text-white">
      © Copyright by Group Anime-API
      </footer>


    </div >

  );
}
