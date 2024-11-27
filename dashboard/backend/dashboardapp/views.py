from django.shortcuts import render

# Create your views here.
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status


class CandleStickView(APIView):
    def get(self, request):
        items = {"data":[{"x":"2023-01-01","open":30,"high":40,"low":25,"close":35},
                     {"x":"2023-01-02","open":35,"high":45,"low":30,"close":40}]}
        return Response(items)
    

class LineChartView(APIView):
    def get(self, request):
        items = {"labels":["Jan","Feb","Mar","Apr"],"data":[10,20,30,40]}
        return Response(items)
    
class BarChartView(APIView):
    def get(self, request):
        items = {"labels":["Product A","Product B","Product C"],"data":[100,150,200]}
        return Response(items)
    
class PieChartView(APIView):
    def get(self, request):
        items = {"labels":["Red","Blue","Yellow"],"data":[300,50,100]}
        return Response(items)
