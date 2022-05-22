export function Banner() {
    return (
      <div className="md:flex md:justify-evenly w-full h-auto" style={{backgroundColor: "#1f3933"}}>

          <div className="">
              <img className="w-96"
                  src="https://globalassets.starbucks.com/assets/39bab62a29214270b6b30eb838e2c5a6.jpg?impolicy=1by1_wide_topcrop_630" />
          </div>
          <div className="grid grid-cols-1 place-items-center space-y-4 py-6 lg:py-0 lg:space-y-0">
              <a href="#" className="text-white text-4xl">
                  Caramel Apple Juice
              </a>
              <p className="lg:text-xl text-center text-white w-1/2">
                  Introducing our super-smooth Chocolate Cream Cold Brew topped with a cloud of silky, chocolaty cold foam.
              </p>
              <button className="rounded-full border border-white p-4 text-white text-xl lg:text-2xl">
                  Try it NOW !
              </button>
          </div>


      </div>
    );
}