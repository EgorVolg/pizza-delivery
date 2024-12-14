import { Container, Filters, ProductsGroupList, Title, TopBar } from "@/components/shared";

export default function Home() {
  return (
    <>
      <Container className="mt-10">
        <Title text="Все пиццы" size="lg" className="font-extrabold" />
      </Container>

      <TopBar />

      <Container className="mt-10 pb-14">
        <div className="flex gap-[80px]">

          <div className="w-[250px]">
            <Filters />
          </div>

          {/* Список товаров */}
          <div className="flex-1">
            <div className="flex flex-col gap-16">
              <ProductsGroupList
                title="Пиццы"
                categoryID={1}
                items={[
                  { id: 1, name: "Пицца 1", imageUrl: "https://media.dodostatic.net/image/r:584x584/11EF12B2F6AFD043932EFBBAF24F90DF.avif", price: 100 },
                  { id: 1, name: "Пицца 1", imageUrl: "https://media.dodostatic.net/image/r:584x584/11EF12B2F6AFD043932EFBBAF24F90DF.avif", price: 100 },
                  { id: 1, name: "Пицца 1", imageUrl: "https://media.dodostatic.net/image/r:584x584/11EF12B2F6AFD043932EFBBAF24F90DF.avif", price: 100 },
                  { id: 1, name: "Пицца 1", imageUrl: "https://media.dodostatic.net/image/r:584x584/11EF12B2F6AFD043932EFBBAF24F90DF.avif", price: 100 },
                  { id: 1, name: "Пицца 1", imageUrl: "https://media.dodostatic.net/image/r:584x584/11EF12B2F6AFD043932EFBBAF24F90DF.avif", price: 100 },
                  { id: 1, name: "Пицца 1", imageUrl: "https://media.dodostatic.net/image/r:584x584/11EF12B2F6AFD043932EFBBAF24F90DF.avif", price: 100 }
                ]}

              />
              <ProductsGroupList
                title="Завтрак"
                categoryID={2}
                items={[
                  { id: 1, name: "Пицца 1", imageUrl: "https://media.dodostatic.net/image/r:584x584/11EF12B2F6AFD043932EFBBAF24F90DF.avif", price: 100 },
                  { id: 1, name: "Пицца 1", imageUrl: "https://media.dodostatic.net/image/r:584x584/11EF12B2F6AFD043932EFBBAF24F90DF.avif", price: 100 },
                  { id: 1, name: "Пицца 1", imageUrl: "https://media.dodostatic.net/image/r:584x584/11EF12B2F6AFD043932EFBBAF24F90DF.avif", price: 100 },
                  { id: 1, name: "Пицца 1", imageUrl: "https://media.dodostatic.net/image/r:584x584/11EF12B2F6AFD043932EFBBAF24F90DF.avif", price: 100 },
                  { id: 1, name: "Пицца 1", imageUrl: "https://media.dodostatic.net/image/r:584x584/11EF12B2F6AFD043932EFBBAF24F90DF.avif", price: 100 },
                  { id: 1, name: "Пицца 1", imageUrl: "https://media.dodostatic.net/image/r:584x584/11EF12B2F6AFD043932EFBBAF24F90DF.avif", price: 100 }
                ]}
              />
              <ProductsGroupList
                title="Комбо"
                items={[
                  { id: 1, name: "Пицца 1", imageUrl: "https://media.dodostatic.net/image/r:584x584/11EF12B2F6AFD043932EFBBAF24F90DF.avif", price: 100 },
                  { id: 1, name: "Пицца 1", imageUrl: "https://media.dodostatic.net/image/r:584x584/11EF12B2F6AFD043932EFBBAF24F90DF.avif", price: 100 },
                  { id: 1, name: "Пицца 1", imageUrl: "https://media.dodostatic.net/image/r:584x584/11EF12B2F6AFD043932EFBBAF24F90DF.avif", price: 100 },
                  { id: 1, name: "Пицца 1", imageUrl: "https://media.dodostatic.net/image/r:584x584/11EF12B2F6AFD043932EFBBAF24F90DF.avif", price: 100 },
                  { id: 1, name: "Пицца 1", imageUrl: "https://media.dodostatic.net/image/r:584x584/11EF12B2F6AFD043932EFBBAF24F90DF.avif", price: 100 },
                  { id: 1, name: "Пицца 1", imageUrl: "https://media.dodostatic.net/image/r:584x584/11EF12B2F6AFD043932EFBBAF24F90DF.avif", price: 100 }
                ]}
                categoryID={3}
              />
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}