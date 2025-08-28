import { Card, CardContent, CardFooter } from "../ui/card";
import { Button } from "../ui/button";
import { brandOptionsMap, categoryOptionsMap } from "@/config";
import { Badge } from "../ui/badge";
import { addToWishlistAsync } from "@/store/shop/wish-slice";
import { useToast } from "../ui/use-toast";
import { useDispatch, useSelector } from "react-redux";

function ShoppingProductTile({
  product,
  handleGetProductDetails,
  handleAddtoCart,
  removeFromWishlist,
  wishList
}) 

{
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const { toast } = useToast();

function addToWishlist(){
        try{dispatch(addToWishlistAsync(
          
            user?.id,
            product._id
          
        )).then((data) => {
          if (data.payload.success) {
            toast({
              title: "Product added to wishlist",
            });
          }
        });}
        catch(err){
          console.log(err);
        }
        console.log(product._id, "productId to wishlist");
      }

  return (
    <Card className="w-full max-w-sm mx-auto">
      <div onClick={() => handleGetProductDetails(product?._id)}>
        <div className="relative">
          <img
            src={product?.image}
            alt={product?.title}
            className="w-fit justify-self-center h-[300px] object-cover rounded-t-lg"
          />
          {product?.totalStock === 0 ? (
            <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">
              Out Of Stock
            </Badge>
          ) : product?.totalStock < 10 ? (
            <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">
              {`Only ${product?.totalStock} items left`}
            </Badge>
          ) : product?.salePrice > 0 ? (
            <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">
              Sale
            </Badge>
          ) : null}
        </div>
        <CardContent className="p-4">
          <h2 className="text-xl font-bold mb-2">{product?.title}</h2>
          <div className="flex justify-between items-center mb-2">
            <span className="text-[16px] text-muted-foreground">
              {categoryOptionsMap[product?.category]}
            </span>
            <span className="text-[16px] text-muted-foreground">
              {brandOptionsMap[product?.brand]}
            </span>
          </div>
          <div className="flex justify-between items-center mb-2">
            <span
              className={`${
                product?.salePrice > 0 ? "line-through" : ""
              } text-lg font-semibold text-primary`}
            >
              ${product?.price}
            </span>
            {product?.salePrice > 0 ? (
              <span className="text-lg font-semibold text-primary">
                ${product?.salePrice}
              </span>
            ) : null}
          </div>
        </CardContent>
      </div>
      <CardFooter>
        {product?.totalStock === 0 ? (
          <Button className="w-full opacity-60 cursor-not-allowed">
            Out Of Stock
          </Button>
        ) : (
          <Button
            onClick={() => handleAddtoCart(product?._id, product?.totalStock)}
            className="w-full"
          >
            Add to cart
          </Button>
        )}
        {
          (wishList?.find((item) => item === product?._id))? (
            <Button
              variant="outline"
              className="w-full mt-2"
              onClick={() => removeFromWishlist(product?._id)}
            >
              Remove from Wishlist
            </Button>
          ) : (
            <Button
              variant="outline"
              className="w-full mt-2"
              onClick={() => addToWishlist()}
            >
              Add to Wishlist
            </Button>
          )
        }
      </CardFooter>
    </Card>
  );
}

export default ShoppingProductTile;
