export function Banner() {
    return (
      <div className="md:flex md:justify-evenly w-full h-auto pt-6" style={{backgroundColor: "#1f3933"}}>

          <div className="">
              <img className="w-96"
                  src="https://globalassets.starbucks.com/assets/b635f407bbcd49e7b8dd9119ce33f76e.jpg?impolicy=1by1_wide_topcrop_630" />
          </div>
          <div className="grid grid-cols-1 place-items-center space-y-4 py-6 lg:py-0 lg:space-y-0">
              <a href="https://globalassets.starbucks.com/assets/b635f407bbcd49e7b8dd9119ce33f76e.jpg?impolicy=1by1_wide_topcrop_630" className="text-white text-4xl">
                  Caffe Latté
              </a>
              <p className="lg:text-xl text-center text-white w-1/2">
                  Introducing our super-smooth Chocolate Cream Cold Brew topped with a cloud of silky, chocolaty cold foam.
              </p>
              <a href="/products/1" className="rounded-full border border-white p-4 text-white text-xl lg:text-2xl">
                  Try it NOW !
              </a>
          </div>


      </div>
    );
}