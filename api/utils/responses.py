"""usually using responses"""

from rest_framework.response import Response

def bad_request(message):
    """return DRF Response with 404"""
    
    return Response({
        'message': message
    }, status=400)
