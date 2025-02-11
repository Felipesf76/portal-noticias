import { Injectable} from '@angular/core';
import { News } from '@app/models/News';

@Injectable()
export class NewsService {
  //TODO: Change to real url
  //private baseUrl = 'http://localhost'
  constructor() { }
  
  getNewsTest(): Array<News>{
    return  [
      new News("2914bb72-5cca-478b-b48a-f8762073d77e", "Descubrimiento en Marte sorprende a científicos", "Se ha detectado una posible fuente de agua en Marte.", "marte.jpg", "Estados Unidos", "NASA", "https://noticiasciencia.com/marte", 1500, new Date('2024-11-01'), "2537a549-0968-4d00-9a98-f8f23e60e3c2", "9233552d-5aca-480b-8f04-ecc02c59cbb1"),
      new News("806189c3-2857-4810-a0a2-5350d044b448", "Avances en la inteligencia artificial", "Nueva IA supera a los humanos en pruebas de lógica compleja.", "ia.jpg", "Japón", "Dr. Akira Takahashi", "https://tecnologiahoy.com/ia", 2500, new Date('2024-11-10'), "2537a549-0968-4d00-9a98-f8f23e60e3c2", "9233552d-5aca-480b-8f04-ecc02c59cbb1"),
      new News("c6675880-d501-4928-9647-35fa75a81c23", "Clima extremo afecta a miles en Europa", "Inundaciones masivas azotan Italia y Francia.", "clima.jpg", "Italia", "Federico Rossi", "https://noticiasmundo.com/clima", 3200, new Date('2024-11-12'), "bb383bbb-7a4a-4ba3-ada2-4d33559cd916", "a391287c-9b9c-46d8-be15-89eb1757e043"),
      new News("99614003-9d20-491f-9391-c9a2c0683bad", "Messi rompe otro récord histórico", "Lionel Messi alcanza 800 goles en su carrera profesional.", "messi.jpg", "Argentina", "Luis Fernández", "https://deportesmundial.com/messi", 5200, new Date('2024-10-25'), "bb383bbb-7a4a-4ba3-ada2-4d33559cd916", "21724ca9-6ae6-4e74-b6fc-b3397b032cd6"),
      new News("9792b403-cfd3-4e49-b6b7-1df00d092052", "Avances en medicina contra el cáncer", "Un nuevo tratamiento muestra resultados prometedores.", "medicina.jpg", "Reino Unido", "Dr. Emma Johnson", "https://saludavances.com/cancer", 1800, new Date('2024-09-15'), "a3414a51-84dc-48f1-b967-9ad4106b8cba", "9233552d-5aca-480b-8f04-ecc02c59cbb1")
    ]
  }

  // getNews() {
  //   return this.http.get(`${this.baseUrl}/api/news`)
  // }
  // getNewsById(id: number) {
  //   return this.http.get(`${this.baseUrl}/api/news/${id}`)
  // }
  // createNews(news: any) {
  //   return this.http.post(`${this.baseUrl}/api/news`, news)
  // }
  // updateNews(news: any) {
  //   return this.http.put(`${this.baseUrl}/api/news`, news)
  // }
  // deleteNews(id: number) {
  //   return this.http.delete(`${this.baseUrl}/api/news/${id}`)
  // }
}
