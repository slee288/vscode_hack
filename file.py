def triangleArea(width,height):
    if not isinstance(width,int) or not isinstance(height,int):
        raise TypeError('Invalid input.')
    else :
        area = (width * height) / 2
        return area